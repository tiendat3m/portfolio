import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi'

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
            document.body.style.backgroundColor = '#020617'
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
            document.body.style.backgroundColor = '#f8fafc'
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className='fixed bottom-8 left-8 z-50 w-14 h-7 rounded-full bg-dark-800 p-1 flex items-center border border-white/10'
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <motion.div
                className='w-5 h-5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center'
                animate={{
                    x: isDark ? 0 : 24
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <HiMoon className='w-3 h-3 text-white' />
                ) : (
                    <HiSun className='w-3 h-3 text-white' />
                )}
            </motion.div>

            {/* Background icons */}
            <div className='absolute inset-0 flex items-center justify-between px-2 pointer-events-none'>
                <HiMoon className='w-3 h-3 text-white/30' />
                <HiSun className='w-3 h-3 text-white/30' />
            </div>
        </motion.button>
    )
}

export default ThemeToggle