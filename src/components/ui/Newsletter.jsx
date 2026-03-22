import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiCheck } from 'react-icons/hi'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Save to localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
        if (!subscribers.includes(email)) {
            subscribers.push(email)
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers))
        }

        setIsSubscribed(true)
        setIsLoading(false)
        setEmail('')

        // Reset after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='glass-card p-8 text-center'
        >
            <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center'>
                <HiMail className='w-8 h-8 text-white' />
            </div>

            <h3 className='text-2xl font-bold text-white mb-4'>
                Subscribe to Newsletter
            </h3>

            <p className='text-white/60 mb-6 max-w-md mx-auto'>
                Get the latest articles, tutorials, and updates delivered straight to your inbox.
            </p>

            {isSubscribed ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='flex items-center justify-center gap-2 text-green-400'
                >
                    <HiCheck className='w-6 h-6' />
                    <span className='font-medium'>Successfully subscribed!</span>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        required
                        className='flex-1 px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                    />
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='btn-primary whitespace-nowrap disabled:opacity-50'
                    >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
            )}
        </motion.div>
    )
}

export default Newsletter