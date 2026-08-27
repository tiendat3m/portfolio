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
                    className="fixed bottom-20 right-6 z-50 flex h-12 w-12 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Scroll to top"
                >
                    <HiChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop
