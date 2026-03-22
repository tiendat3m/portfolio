import React from 'react'
import { motion } from 'framer-motion'

const PageLoader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-dark-950 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                {/* Animated logo/loader */}
                <motion.div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        borderRadius: ['20%', '50%', '20%']
                    }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeat: Infinity
                    }}
                />

                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary blur-xl opacity-50"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeat: Infinity
                    }}
                />

                {/* Loading text */}
                <motion.p
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    LOADING
                </motion.p>
            </div>

            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent-primary/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default PageLoader