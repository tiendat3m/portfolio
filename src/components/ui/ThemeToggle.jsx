import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiTerminal, HiEyeOff } from 'react-icons/hi'

/**
 * ThemeToggle — toggles the CRT effect (scanlines + scan beam + glow).
 *
 * `crt-muted` class on <html> disables the CRT overlays via CSS, leaving a
 * flat dark terminal that is easier on the eyes. Preference persists in
 * localStorage under the "crt" key. Defaults to CRT active.
 */
const ThemeToggle = () => {
    const [crtMuted, setCrtMuted] = useState(() => {
        const saved = localStorage.getItem('crt')
        // Default: CRT active (not muted).
        return saved ? saved === 'muted' : false
    })

    useEffect(() => {
        const root = document.documentElement
        if (crtMuted) {
            root.classList.add('crt-muted')
            root.classList.remove('dark')
        } else {
            root.classList.remove('crt-muted')
            root.classList.add('dark')
        }
        localStorage.setItem('crt', crtMuted ? 'muted' : 'active')
    }, [crtMuted])

    const toggle = () => setCrtMuted((m) => !m)

    return (
        <motion.button
            onClick={toggle}
            className="fixed bottom-8 left-8 z-50 flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            title={crtMuted ? 'CRT mode muted' : 'CRT mode active'}
            aria-label={crtMuted ? 'Turn on CRT mode' : 'Turn off CRT mode'}
            aria-pressed={!crtMuted}
        >
            {crtMuted ? (
                <HiEyeOff className="h-5 w-5" />
            ) : (
                <HiTerminal className="h-5 w-5" />
            )}
        </motion.button>
    )
}

export default ThemeToggle