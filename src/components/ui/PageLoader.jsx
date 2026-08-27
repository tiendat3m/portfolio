import React from 'react'
import { motion } from 'framer-motion'

const PageLoader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-terminal-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
        >
            <div className="w-full max-w-md border border-terminal-border bg-terminal-panel p-5">
                <div className="mb-4 flex items-center gap-2 border-b border-terminal-border pb-3">
                    <span className="terminal-dot bg-red-500" />
                    <span className="terminal-dot bg-yellow-400" />
                    <span className="terminal-dot bg-green-400" />
                    <span className="ml-2 text-xs text-terminal-text">boot@portfolio: ~$</span>
                </div>

                <motion.p
                    className="text-sm text-terminal-green"
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                >
                    $ npm run portfolio:init<span className="terminal-cursor">_</span>
                </motion.p>
                <p className="mt-3 text-sm text-terminal-muted">&gt; Loading interface...</p>
            </div>
        </motion.div>
    )
}

export default PageLoader
