// Email Service using EmailJS
// Website: https://www.emailjs.com/
// Free tier: 200 emails/month

import emailjs from '@emailjs/browser'

// EmailJS Configuration
// Get these from: https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

// Helper function to show toast notification
const showToast = (message, type = 'info') => {
    window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message, type }
    }))
}

// Send contact form email
export const sendContactEmail = async (formData) => {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Portfolio Owner',
            reply_to: formData.email
        }

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        )

        console.log('Email sent successfully:', response)
        showToast('Email sent successfully!', 'success')
        return { success: true, response }
    } catch (error) {
        console.error('Error sending email:', error)
        showToast('Failed to send email. Please try again.', 'error')
        return { success: false, error }
    }
}

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email) => {
    try {
        const templateParams = {
            to_email: email,
            to_name: 'Subscriber',
            message: 'Thank you for subscribing to our newsletter!'
        }

        // Use a different template for newsletter
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'newsletter_template',
            templateParams
        )

        console.log('Newsletter email sent:', response)
        showToast('Welcome email sent!', 'success')
        return { success: true, response }
    } catch (error) {
        console.error('Error sending newsletter email:', error)
        // Don't show error toast for newsletter - it's optional
        return { success: false, error }
    }
}

// Check if EmailJS is configured
export const isEmailConfigured = () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    return serviceId && templateId && publicKey &&
        serviceId !== 'your_service_id' &&
        templateId !== 'your_template_id' &&
        publicKey !== 'your_public_key'
}

export default {
    sendContactEmail,
    sendNewsletterWelcome,
    isEmailConfigured
}