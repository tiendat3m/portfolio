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
        <section id="contact" className="section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4">
                        Get In Touch
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-white/60">
                        I’m open to frontend opportunities, product-focused teams, and selected
                        freelance work where clean delivery and practical UI matter.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Open to Opportunities
                        </h3>

                        <div className="premium-card rounded-3xl p-5 mb-6">
                            <div className="relative z-10">
                                <p className="section-kicker mb-3">Current Focus</p>
                                <p className="text-white/70 leading-7 text-sm sm:text-base">
                                    Frontend Engineer roles, product-focused teams, admin/dashboard
                                    interfaces, and modern React or Angular projects with strong UX
                                    and maintainable delivery.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                                    <HiMail className="w-6 h-6 text-accent-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Email</h4>
                                    <p className="text-white/60">phantiendat14012002@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent-secondary/20 flex items-center justify-center flex-shrink-0">
                                    <HiLocationMarker className="w-6 h-6 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Location</h4>
                                    <p className="text-white/60">Ho Chi Minh City, Vietnam</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent-tertiary/20 flex items-center justify-center flex-shrink-0">
                                    <HiPhone className="w-6 h-6 text-accent-tertiary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Phone</h4>
                                    <p className="text-white/60">0343759130</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8">
                            <h4 className="text-white font-medium mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/tiendat3m"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-accent-primary transition-colors"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/tiendat3m/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-accent-primary transition-colors"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://x.com/APhan33064"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-accent-primary transition-colors"
                                >
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/justdatt.3m/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-accent-primary transition-colors"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Start a Conversation</h3>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="glass-card p-8 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <HiPaperAirplane className="w-8 h-8 text-green-400" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                <p className="text-white/60">
                                    Thanks for reaching out. I’ll review your message and get back
                                    to you as soon as possible.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-white/80 text-sm mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name or company"
                                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about the role, product, or project you’d like to discuss..."
                                        rows={5}
                                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <HiPaperAirplane className="w-5 h-5" />
                                            Send Inquiry
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[150px]" />
        </section>
    )
}

export default Contact
