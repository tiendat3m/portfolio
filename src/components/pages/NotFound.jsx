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
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-terminal-bg">
            <div className="terminal-window">
                <div className="terminal-titlebar" aria-hidden="true">
                    <div className="flex items-center gap-2">
                        <span className="terminal-dot bg-red-500" />
                        <span className="terminal-dot bg-yellow-400" />
                        <span className="terminal-dot bg-green-400" />
                    </div>
                    <span className="truncate text-xs text-terminal-text sm:text-sm">
                        user@portfolio: ~/404$
                    </span>
                    <span className="terminal-cursor ml-auto hidden sm:inline-block">_</span>
                </div>

                <div className="container-custom relative z-10 py-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        <motion.h1
                            className="mb-4 text-[120px] font-medium leading-none text-terminal-accent md:text-[180px]"
                            initial={{ scale: 0.96 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            404
                        </motion.h1>

                        <motion.p
                            className="terminal-command mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                        >
                            cat route.error
                        </motion.p>

                        <motion.h2
                            className="terminal-heading mb-4 text-3xl md:text-4xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Page Not Found
                        </motion.h2>

                        <motion.p
                            className="mx-auto mb-12 max-w-md text-lg text-terminal-text/75"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Oops! The page you are looking for does not exist or has been moved.
                        </motion.p>

                        <motion.div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button
                                onClick={goHome}
                                className="btn-primary flex items-center gap-2"
                            >
                                <HiHome className="h-5 w-5" />
                                Back to Home
                            </button>
                            <button
                                onClick={goBack}
                                className="btn-outline flex items-center gap-2"
                            >
                                <HiArrowLeft className="h-5 w-5" />
                                Go Back
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
