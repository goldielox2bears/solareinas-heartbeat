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
    const { name, email, phone, items, total_eur, notes } = body;

    if (!name || !email || !items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const itemsHtml = items.map((item: { name: string; qty: number; price: number }) =>
      `<tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d4;">${item.name}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d4; text-align: center;">×${item.qty}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d4; text-align: right;">€${(item.price * item.qty).toFixed(2)}</td>
      </tr>`
    ).join('');

    // Notify admin
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Solareinas Market <onboarding@resend.dev>',
        to: ['bohrn.farm@gmail.com'],
        subject: `🛒 New Market Order – €${total_eur} from ${name}`,
        html: `
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
              <thead>
                <tr style="background: #f0ebe2;">
                  <th style="padding: 8px; text-align: left;">Product</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 12px 0; font-weight: bold; color: #5c4a2a;">Total (excl. shipping)</td>
                  <td style="padding: 12px 0; font-weight: bold; color: #5c4a2a; text-align: right;">€${total_eur}</td>
                </tr>
              </tfoot>
            </table>

            <p style="color: #7a6848; font-size: 14px; margin-top: 20px;">
              Please follow up with the customer to arrange payment and shipping.
            </p>
          </div>
        `,
      }),
    });

    if (!adminEmailRes.ok) {
      const errBody = await adminEmailRes.text();
      console.error('Admin email failed:', errBody);
    }

    // Confirm to customer
    const customerEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Solareinas Market <onboarding@resend.dev>',
        to: [email],
        subject: `Thank you for your order, ${name.split(' ')[0]} 🌿`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #faf9f7; border-radius: 8px;">
            <h2 style="color: #5c4a2a; margin-bottom: 4px;">Your order is received 🌿</h2>
            <p style="color: #7a6848;">Dear ${name},</p>
            
            <p style="color: #5c4a2a; line-height: 1.7;">
              Thank you for shopping at Solareinas Market. Every purchase directly supports the animals and regenerative land practices at our sanctuary.
            </p>

            <h3 style="color: #5c4a2a;">Your Order</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f0ebe2;">
                  <th style="padding: 8px; text-align: left;">Product</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 12px 0; font-weight: bold; color: #5c4a2a;">Total (excl. shipping)</td>
                  <td style="padding: 12px 0; font-weight: bold; color: #5c4a2a; text-align: right;">€${total_eur}</td>
                </tr>
              </tfoot>
            </table>

            <p style="color: #7a6848; line-height: 1.7; margin-top: 20px;">
              We will be in touch shortly to arrange payment and shipping. In the meantime, know that your support makes a real difference to the animals and land in our care.
            </p>

            <p style="color: #7a6848;">With gratitude,<br><strong>The Solareinas Ranch Family</strong></p>
          </div>
        `,
      }),
    });

    if (!customerEmailRes.ok) {
      const errBody = await customerEmailRes.text();
      console.error('Customer email failed:', errBody);
    }

    return new Response(JSON.stringify({ success: true }), {
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
