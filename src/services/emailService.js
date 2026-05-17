// Email Service using Supabase Edge Functions + Resend
// Resend Free tier: 3,000 emails/month
// Docs: https://resend.com/docs

import { supabase } from './supabaseService'

// Send contact form email via Supabase Edge Function
export const sendContactEmail = async (formData) => {
    try {
        const { data, error } = await supabase.functions.invoke('send-email', {
            body: {
                type: 'contact',
                data: {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message
                }
            }
        })

        if (error) {
            console.error('Error sending email:', error)
            return { success: false, error }
        }

        console.log('Email sent successfully:', data)
        return { success: true, response: data }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error }
    }
}

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email) => {
    try {
        const { data, error } = await supabase.functions.invoke('send-email', {
            body: {
                type: 'newsletter',
                data: {
                    to_email: email
                }
            }
        })

        if (error) {
            console.error('Error sending newsletter email:', error)
            return { success: false, error }
        }

        console.log('Newsletter email sent:', data)
        return { success: true, response: data }
    } catch (error) {
        console.error('Error sending newsletter email:', error)
        return { success: false, error }
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