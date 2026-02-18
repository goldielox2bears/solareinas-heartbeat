import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { donor_name, donor_email, message, amount_cents, gift_type, gift_target, animal_id } = body;

    // Validate required fields
    if (!donor_name || !donor_email || !amount_cents || !gift_type) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save gift to database using service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: gift, error: dbError } = await supabase
      .from('gifts')
      .insert({
        donor_name,
        donor_email,
        message: message || null,
        amount_cents,
        gift_type,
        gift_target: gift_target || null,
        animal_id: animal_id || null,
        status: 'pending',
        notified: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to save gift', details: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const amountEur = (amount_cents / 100).toLocaleString('en-IE', { style: 'currency', currency: 'EUR' });
    const giftDescription = gift_target
      ? `${gift_type === 'animal' ? '🐴 Supporting ' : '🏗️ Funding the '}"${gift_target}"`
      : '💝 Custom gift to the sanctuary';

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send notification to sanctuary admin
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Solareinas Sanctuary <onboarding@resend.dev>',
        to: ['bohrn.farm@gmail.com'],
        subject: `🎁 New Gift Received – ${amountEur} from ${donor_name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f7; border-radius: 8px;">
            <h2 style="color: #5c4a2a; margin-bottom: 4px;">New Gift Received 🌿</h2>
            <p style="color: #7a6848; margin-top: 0;">Someone has submitted a gift to Solareinas Sanctuary</p>
            
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #8b7355;">
              <p><strong>Donor:</strong> ${donor_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${donor_email}">${donor_email}</a></p>
              <p><strong>Amount:</strong> ${amountEur}</p>
              <p><strong>Gift:</strong> ${giftDescription}</p>
              ${message ? `<p><strong>Message:</strong> "${message}"</p>` : ''}
            </div>

            <p style="color: #7a6848; font-size: 14px;">
              This gift is currently marked as <strong>pending</strong>. Please follow up with the donor to arrange payment.
            </p>
            <p style="color: #7a6848; font-size: 14px;">Gift ID: <code>${gift.id}</code></p>
          </div>
        `,
      }),
    });

    if (!adminEmailRes.ok) {
      const errBody = await adminEmailRes.text();
      console.error('Admin email failed:', errBody);
    }

    // Send confirmation to donor
    const donorEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Solareinas Sanctuary <onboarding@resend.dev>',
        to: [donor_email],
        subject: `Thank you for your gift, ${donor_name.split(' ')[0]} 🌿`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f7; border-radius: 8px;">
            <h2 style="color: #5c4a2a; margin-bottom: 4px;">Your generosity means the world 🌿</h2>
            <p style="color: #7a6848;">Dear ${donor_name},</p>
            
            <p style="color: #5c4a2a; line-height: 1.7;">
              Thank you for your beautiful gift to Solareinas Sanctuary. Your generosity becomes trees, care, and safe ground for the animals who need it most.
            </p>

            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #8b7355;">
              <p style="margin: 0 0 8px;"><strong>Gift Amount:</strong> ${amountEur}</p>
              <p style="margin: 0;"><strong>Directed to:</strong> ${giftDescription}</p>
              ${message ? `<p style="margin: 8px 0 0;"><strong>Your message:</strong> "${message}"</p>` : ''}
            </div>

            <p style="color: #7a6848; line-height: 1.7;">
              We will be in touch shortly to complete the gift process. In the meantime, know that your kindness is felt by every creature here at the sanctuary.
            </p>

            <p style="color: #7a6848;">With deep gratitude,<br><strong>The Solareinas Sanctuary Family</strong></p>
          </div>
        `,
      }),
    });

    if (!donorEmailRes.ok) {
      const errBody = await donorEmailRes.text();
      console.error('Donor email failed:', errBody);
    }

    // Mark as notified in DB
    await supabase.from('gifts').update({ notified: true }).eq('id', gift.id);

    return new Response(JSON.stringify({ success: true, gift_id: gift.id }), {
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
