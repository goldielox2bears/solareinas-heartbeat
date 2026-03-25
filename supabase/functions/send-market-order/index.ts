import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

function validateOrderInput(body: unknown): { valid: true; data: Record<string, unknown> } | { valid: false; error: string } {
  if (typeof body !== 'object' || body === null) return { valid: false, error: 'Invalid request body' };
  const b = body as Record<string, unknown>;

  if (typeof b.name !== 'string' || b.name.trim().length < 2 || b.name.length > 100)
    return { valid: false, error: 'name must be 2–100 characters' };

  if (typeof b.email !== 'string' || !EMAIL_REGEX.test(b.email) || b.email.length > 255)
    return { valid: false, error: 'Invalid email address' };

  if (b.phone !== undefined && b.phone !== null && (typeof b.phone !== 'string' || b.phone.length > 30))
    return { valid: false, error: 'phone must be under 30 characters' };

  if (b.notes !== undefined && b.notes !== null && (typeof b.notes !== 'string' || b.notes.length > 2000))
    return { valid: false, error: 'notes must be under 2000 characters' };

  if (!Array.isArray(b.items) || b.items.length === 0 || b.items.length > 50)
    return { valid: false, error: 'items must be a non-empty array of up to 50 products' };

  for (const item of b.items) {
    if (typeof item !== 'object' || item === null) return { valid: false, error: 'Each item must be an object' };
    const i = item as Record<string, unknown>;
    if (typeof i.name !== 'string' || i.name.length > 200) return { valid: false, error: 'Item name must be under 200 characters' };
    if (typeof i.qty !== 'number' || !Number.isInteger(i.qty) || i.qty < 1 || i.qty > 100) return { valid: false, error: 'Item qty must be an integer between 1 and 100' };
    if (typeof i.price !== 'number' || i.price < 0 || i.price > 100000) return { valid: false, error: 'Item price must be between 0 and 100,000' };
  }

  if (typeof b.total_eur !== 'string' || !/^\d+(\.\d{1,2})?$/.test(b.total_eur))
    return { valid: false, error: 'total_eur must be a valid decimal string' };

  return { valid: true, data: b };
}

function buildItemsHtml(items: OrderItem[]): string {
  return items.map((item) =>
    `<tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d4;">${item.name}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d4; text-align: center;">×${item.qty}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d4; text-align: right;">€${(item.price * item.qty).toFixed(2)}</td>
    </tr>`
  ).join('');
}

function buildAdminEmailHtml(name: string, email: string, phone: string | undefined, notes: string | undefined, itemsHtml: string, total_eur: string): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f7; border-radius: 8px;">
      <h2 style="color: #5c4a2a; margin-bottom: 4px;">New Market Order 🌿</h2>
      <p style="color: #7a6848; margin-top: 0;">A new order has been placed via the Market page</p>
      <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #8b7355;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${notes ? `<p><strong>Notes:</strong> "${notes}"</p>` : ''}
      </div>
      <h3 style="color: #5c4a2a;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead><tr style="background: #f0ebe2;">
          <th style="padding: 8px; text-align: left;">Product</th>
          <th style="padding: 8px; text-align: center;">Qty</th>
          <th style="padding: 8px; text-align: right;">Total</th>
        </tr></thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot><tr>
          <td colspan="2" style="padding: 12px 0; font-weight: bold; color: #5c4a2a;">Total (excl. shipping)</td>
          <td style="padding: 12px 0; font-weight: bold; color: #5c4a2a; text-align: right;">€${total_eur}</td>
        </tr></tfoot>
      </table>
      <p style="color: #7a6848; font-size: 14px; margin-top: 20px;">Please follow up with the customer to arrange payment and shipping.</p>
    </div>`;
}

function buildCustomerEmailHtml(name: string, itemsHtml: string, total_eur: string): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f7; border-radius: 8px;">
      <h2 style="color: #5c4a2a; margin-bottom: 4px;">Your order is received 🌿</h2>
      <p style="color: #7a6848;">Dear ${name},</p>
      <p style="color: #5c4a2a; line-height: 1.7;">Thank you for shopping at Solareinas Market. Every purchase directly supports the animals and regenerative land practices at our sanctuary.</p>
      <h3 style="color: #5c4a2a;">Your Order</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead><tr style="background: #f0ebe2;">
          <th style="padding: 8px; text-align: left;">Product</th>
          <th style="padding: 8px; text-align: center;">Qty</th>
          <th style="padding: 8px; text-align: right;">Total</th>
        </tr></thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot><tr>
          <td colspan="2" style="padding: 12px 0; font-weight: bold; color: #5c4a2a;">Total (excl. shipping)</td>
          <td style="padding: 12px 0; font-weight: bold; color: #5c4a2a; text-align: right;">€${total_eur}</td>
        </tr></tfoot>
      </table>
      <p style="color: #7a6848; line-height: 1.7; margin-top: 20px;">We will be in touch shortly to arrange payment and shipping. In the meantime, know that your support makes a real difference to the animals and land in our care.</p>
      <p style="color: #7a6848;">With gratitude,<br><strong>The Solareinas Ranch Family</strong></p>
    </div>`;
}

async function sendEmail(apiKey: string, from: string, to: string[], subject: string, html: string): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    console.error('Email send failed:', await res.text());
    return false;
  }
  return true;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const validation = validateOrderInput(body);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { name, email, phone, notes, items, total_eur } = validation.data as {
      name: string; email: string; phone?: string; notes?: string; items: OrderItem[]; total_eur: string;
    };

    // Save order to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase.from('market_orders').insert({
      customer_name: name,
      customer_email: email,
      customer_phone: phone || null,
      notes: notes || null,
      items: items,
      total_eur: total_eur,
      status: 'pending',
    });

    if (dbError) {
      console.error('Failed to save order to database:', dbError);
    }

    // Send emails
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fromAddr = 'Solareinas Market <onboarding@resend.dev>';
    const itemsHtml = buildItemsHtml(items);

    await Promise.all([
      sendEmail(RESEND_API_KEY, fromAddr, ['bohrn.farm@gmail.com'],
        `🛒 New Market Order – €${total_eur} from ${name}`,
        buildAdminEmailHtml(name, email, phone, notes, itemsHtml, total_eur)),
      sendEmail(RESEND_API_KEY, fromAddr, [email],
        `Thank you for your order, ${name.split(' ')[0]} 🌿`,
        buildCustomerEmailHtml(name, itemsHtml, total_eur)),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
