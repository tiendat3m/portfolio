// Supabase Edge Function: Send Email via Resend
// Docs: https://supabase.com/docs/guides/functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev'
const TO_EMAIL = Deno.env.get('TO_EMAIL')!

interface ContactData {
    from_name: string
    from_email: string
    message: string
}

interface NewsletterData {
    to_email: string
}

interface EmailRequest {
    type: 'contact' | 'newsletter'
    data: ContactData | NewsletterData
}

async function sendContactEmail(data: ContactData) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: `New Contact Form Message from ${data.from_name}`,
            reply_to: data.from_email,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.from_name}</p>
        <p><strong>Email:</strong> ${data.from_email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
        })
    })

    return res
}

async function sendNewsletterEmail(data: NewsletterData) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: data.to_email,
            subject: 'Welcome to My Newsletter!',
            html: `
        <h2>Welcome to My Newsletter!</h2>
        <p>Thank you for subscribing. You'll receive updates about new posts and projects.</p>
        <p>Best regards!</p>
      `
        })
    })

    return res
}

serve(async (req) => {
    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
    }

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { type, data }: EmailRequest = await req.json()

        if (!type || !data) {
            return new Response(JSON.stringify({ error: 'Missing type or data' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        let response: Response

        if (type === 'contact') {
            response = await sendContactEmail(data as ContactData)
        } else if (type === 'newsletter') {
            response = await sendNewsletterEmail(data as NewsletterData)
        } else {
            return new Response(JSON.stringify({ error: 'Invalid email type' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        const result = await response.json()

        if (!response.ok) {
            return new Response(JSON.stringify({ error: result }), {
                status: response.status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        return new Response(JSON.stringify({ success: true, data: result }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
})
