import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronUp } from 'react-icons/hi'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className='fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center text-white shadow-lg shadow-accent-primary/30 hover:shadow-accent-primary/50 transition-shadow'
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <HiChevronUp className='w-6 h-6' />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop