import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiTerminal, HiEyeOff } from 'react-icons/hi'

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : true
    })

    useEffect(() => {
        // Apply theme to document
        if (isDark) {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed bottom-8 left-8 z-50 flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            title={isDark ? 'CRT mode active' : 'CRT mode muted'}
            aria-label="Toggle terminal display mode"
        >
            {isDark ? <HiTerminal className="h-5 w-5" /> : <HiEyeOff className="h-5 w-5" />}
        </motion.button>
    )
}

export default ThemeToggle
