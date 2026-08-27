import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiMail, HiLocationMarker, HiPhone, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'

const isEmailConfigured = () =>
    Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

const Contact = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Helper function to show toast notification
    const showToast = (message, type = 'info') => {
        window.dispatchEvent(
            new CustomEvent('show-toast', {
                detail: { message, type }
            })
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            showToast('Please fill in all fields', 'error')
            return
        }

        setIsSubmitting(true)

        try {
            // Save to localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
            const newMessage = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString()
            }
            messages.push(newMessage)
            localStorage.setItem('contactMessages', JSON.stringify(messages))

            // Track results
            let emailSent = false
            let subscriberResult = null

            // Send email if configured
            if (isEmailConfigured()) {
                const { sendContactEmail } = await import('../../services/emailService')
                const emailResult = await sendContactEmail(formData)
                emailSent = emailResult.success
            }

            // Try to add email to subscribers
            const { addSubscriber } = await import('../../services/supabaseService')
            subscriberResult = await addSubscriber(formData.email)

            // Determine appropriate message based on results
            const isEmailConfiguredFlag = isEmailConfigured()

            if (isEmailConfiguredFlag && emailSent) {
                // Email sent successfully
                if (subscriberResult.isAlreadySubscribed) {
                    showToast("Message sent! You're already subscribed to updates.", 'success')
                } else if (subscriberResult.error) {
                    showToast('Message sent! (Newsletter subscription unavailable)', 'success')
                } else {
                    showToast("Message sent! You've been subscribed to updates.", 'success')
                }
            } else if (isEmailConfiguredFlag && !emailSent) {
                // Email configured but failed - still saved locally
                showToast(
                    'Message saved locally. Email delivery failed - please try again later.',
                    'error'
                )
            } else {
                // Email not configured - saved locally only
                if (subscriberResult.isAlreadySubscribed) {
                    showToast("Message saved! You're already subscribed.", 'success')
                } else if (subscriberResult.error) {
                    showToast('Message saved successfully!', 'success')
                } else {
                    showToast("Message saved! You've been subscribed to updates.", 'success')
                }
            }

            setIsSubmitted(true)
            setFormData({ name: '', email: '', message: '' })

            // Reset after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000)
        } catch (error) {
            console.error('Error sending message:', error)
            showToast('Failed to send message. Please try again.', 'error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="terminal-section section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">contact --send</p>
                    <h2 className="terminal-heading text-3xl md:text-5xl">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-terminal-text/80">
                        I’m open to frontend opportunities, product-focused teams, and selected
                        freelance work where clean delivery and practical UI matter.
                    </p>
                </motion.div>

                <div className="grid gap-10 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -34 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="mb-6 text-2xl font-medium text-terminal-green">
                            Open to Opportunities
                        </h3>

                        <div className="premium-card mb-6 p-5">
                            <div className="relative z-10">
                                <p className="section-kicker mb-3">Current Focus</p>
                                <p className="text-sm leading-7 text-terminal-text/80 sm:text-base">
                                    Frontend Engineer roles, product-focused teams, admin/dashboard
                                    interfaces, and modern React or Angular projects with strong UX
                                    and maintainable delivery.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {[
                                {
                                    icon: HiMail,
                                    label: 'Email',
                                    value: 'phantiendat14012002@gmail.com'
                                },
                                {
                                    icon: HiLocationMarker,
                                    label: 'Location',
                                    value: 'Ho Chi Minh City, Vietnam'
                                },
                                { icon: HiPhone, label: 'Phone', value: '0343759130' }
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-terminal-border bg-terminal-surface">
                                        <Icon className="h-6 w-6 text-terminal-accent" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-medium text-terminal-green">
                                            {label}
                                        </h4>
                                        <p className="break-words text-terminal-text/70">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h4 className="mb-4 font-medium text-terminal-green">Follow Me</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    {
                                        icon: FaGithub,
                                        href: 'https://github.com/tiendat3m',
                                        label: 'GitHub'
                                    },
                                    {
                                        icon: FaLinkedin,
                                        href: 'https://www.linkedin.com/in/tiendat3m/',
                                        label: 'LinkedIn'
                                    },
                                    {
                                        icon: FaTwitter,
                                        href: 'https://x.com/APhan33064',
                                        label: 'X (Twitter)'
                                    },
                                    {
                                        icon: FaInstagram,
                                        href: 'https://www.instagram.com/justdatt.3m/',
                                        label: 'Instagram'
                                    }
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                                        aria-label={label}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 34 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="mb-6 text-2xl font-medium text-terminal-green">
                            Start a Conversation
                        </h3>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="glass-card p-8 text-center"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-terminal-border bg-terminal-bg">
                                    <HiPaperAirplane className="h-8 w-8 text-terminal-accent" />
                                </div>
                                <h4 className="mb-2 text-xl font-medium text-terminal-green">
                                    Message Sent!
                                </h4>
                                <p className="text-terminal-text/70">
                                    Thanks for reaching out. I’ll review your message and get back
                                    to you as soon as possible.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {[
                                    {
                                        label: 'Name',
                                        name: 'name',
                                        type: 'text',
                                        placeholder: 'Your name or company'
                                    },
                                    {
                                        label: 'Email',
                                        name: 'email',
                                        type: 'email',
                                        placeholder: 'your@email.com'
                                    }
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="mb-2 block text-sm text-terminal-text/80">
                                            $ set {field.name}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="w-full border border-terminal-border bg-terminal-surface px-4 py-3 text-terminal-green placeholder-terminal-muted focus:border-terminal-accent focus:outline-none"
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="mb-2 block text-sm text-terminal-text/80">
                                        $ write message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about the role, product, or project you’d like to discuss..."
                                        rows={5}
                                        className="w-full resize-none border border-terminal-border bg-terminal-surface px-4 py-3 text-terminal-green placeholder-terminal-muted focus:border-terminal-accent focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary flex w-full items-center justify-center gap-2 py-4 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="h-5 w-5 animate-spin border-2 border-terminal-border border-t-terminal-accent" />
                                    ) : (
                                        <>
                                            <HiPaperAirplane className="h-5 w-5" />
                                            Send Inquiry
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
