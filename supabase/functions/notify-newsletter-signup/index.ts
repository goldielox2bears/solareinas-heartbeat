import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
const ADMIN_EMAIL = 'solareinas@icloud.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const b = (body ?? {}) as Record<string, unknown>;
    const emailRaw = typeof b.email === 'string' ? b.email.trim() : '';
    const nameRaw = typeof b.name === 'string' ? b.name.trim().slice(0, 100) : '';
    const source = typeof b.source === 'string' ? b.source.trim().slice(0, 50) : 'sanctuary_news';

    if (!EMAIL_REGEX.test(emailRaw) || emailRaw.length > 255) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: emailRaw,
        name: nameRaw || null,
        source,
      });

    let alreadySubscribed = false;
    if (dbError) {
      // Postgres unique violation
      if ((dbError as { code?: string }).code === '23505') {
        alreadySubscribed = true;
      } else {
        console.error('DB insert error:', dbError);
        return new Response(JSON.stringify({ error: 'Could not save subscription. Please try again.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Notify admin (only on truly new subscribers)
    if (!alreadySubscribed) {
      const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
      if (RESEND_API_KEY) {
        try {
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Solareinas Sanctuary <onboarding@resend.dev>',
              to: [ADMIN_EMAIL],
              subject: `🌿 New Sanctuary News subscriber – ${emailRaw}`,
              html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f7; border-radius: 8px;">
                  <h2 style="color: #5c4a2a; margin-bottom: 4px;">New Sanctuary News Subscriber 🌿</h2>
                  <p style="color: #7a6848; margin-top: 0;">Someone just signed up to receive Sanctuary News.</p>
                  <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #8b7355;">
                    <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${emailRaw}">${emailRaw}</a></p>
                    ${nameRaw ? `<p style="margin: 0 0 8px;"><strong>Name:</strong> ${nameRaw}</p>` : ''}
                    <p style="margin: 0;"><strong>Source:</strong> ${source}</p>
                  </div>
                  <p style="color: #7a6848; font-size: 14px;">Saved to <code>newsletter_subscribers</code> in Supabase.</p>
                </div>
              `,
            }),
          });
          if (!res.ok) {
            const t = await res.text();
            console.error('Admin notification failed:', t);
          }
        } catch (e) {
          console.error('Admin notification exception:', e);
        }
      } else {
        console.warn('RESEND_API_KEY not set — skipping admin notification.');
      }
    }

    return new Response(JSON.stringify({ success: true, alreadySubscribed }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
