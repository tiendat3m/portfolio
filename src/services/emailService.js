// Email Service using Supabase Edge Functions + Resend
// Resend Free tier: 3,000 emails/month
// Docs: https://resend.com/docs

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Direct fetch to Edge Function (avoids CORS issues with SDK)
async function invokeEdgeFunction(type, data) {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ type, data })
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(error.error?.message || error.message || 'Request failed')
    }

    return response.json()
}

// Send contact form email via Supabase Edge Function
export const sendContactEmail = async (formData) => {
    try {
        const result = await invokeEdgeFunction('contact', {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        })

        console.log('Email sent successfully:', result)
        return { success: true, response: result }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error: error.message }
    }
}

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email) => {
    try {
        const result = await invokeEdgeFunction('newsletter', {
            to_email: email
        })

        console.log('Newsletter email sent:', result)
        return { success: true, response: result }
    } catch (error) {
        console.error('Error sending newsletter email:', error)
        return { success: false, error: error.message }
    }
}

// Check if Supabase is configured
export const isEmailConfigured = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    return !!(supabaseUrl && supabaseKey)
}

export default {
    sendContactEmail,
    sendNewsletterWelcome,
    isEmailConfigured
}
