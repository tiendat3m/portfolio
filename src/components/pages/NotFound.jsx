import React from 'react'
import { motion } from 'framer-motion'
import { HiHome, HiArrowLeft } from 'react-icons/hi'

const NotFound = () => {
    const goHome = () => {
        window.location.href = '/'
    }

    const goBack = () => {
        window.history.back()
    }

    return (
        <div className='min-h-screen bg-dark-950 flex items-center justify-center relative overflow-hidden'>
            {/* Background effects */}
            <div className='absolute inset-0'>
                <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[150px]' />
                <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[150px]' />
            </div>

            <div className='container-custom text-center relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* 404 Number */}
                    <motion.h1
                        className='text-[150px] md:text-[200px] font-bold gradient-text leading-none mb-4'
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <motion.h2
                        className='text-3xl md:text-4xl font-bold text-white mb-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        className='text-white/60 text-lg mb-12 max-w-md mx-auto'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Oops! The page you are looking for does not exist or has been moved.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className='flex flex-col sm:flex-row items-center justify-center gap-4'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={goHome}
                            className='btn-primary flex items-center gap-2'
                        >
                            <HiHome className='w-5 h-5' />
                            Back to Home
                        </button>
                        <button
                            onClick={goBack}
                            className='btn-outline flex items-center gap-2'
                        >
                            <HiArrowLeft className='w-5 h-5' />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Animated elements */}
                    <motion.div
                        className='mt-16 flex justify-center gap-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className='w-3 h-3 rounded-full bg-accent-primary/50'
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default NotFound