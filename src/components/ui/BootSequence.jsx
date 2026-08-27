import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * BootSequence — fake terminal boot log shown once per browser session.
 *
 * Runs only on the first mount per session (guarded by sessionStorage) so
 * navigating between routes/sections does not replay it. Reduced-motion users
 * skip the animation and the parent falls through to content immediately.
 *
 * Each line is revealed on a stagger; when the last line is shown we wait a
 * beat, then call `onComplete` so the parent can fade us out and mount the app.
 */
const BOOT_LINES = [
    '[ OK ] Loading modules.........',
    '[ OK ] Initializing UI runtime.',
    '[ OK ] Mounting components....',
    '[ OK ] Establishing connection',
    '[ OK ] Connection established.',
    '[ OK ] portfolio: ready.'
]

// Total reveal time kept short (1.5–2s) so the boot never blocks content long.
const LINE_DELAY = 220
const TAIL_DELAY = 350

const BootSequence = ({ onComplete }) => {
    const [visibleLines, setVisibleLines] = useState(0)
    const completedRef = useRef(false)

    useEffect(() => {
        // Reduced motion: skip the sequence entirely.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            onComplete()
            return undefined
        }

        let timers = []
        BOOT_LINES.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleLines(i + 1), i * LINE_DELAY))
        })
        // After the last line + small tail, hand control back to the parent.
        timers.push(
            setTimeout(() => {
                if (!completedRef.current) {
                    completedRef.current = true
                    onComplete()
                }
            }, BOOT_LINES.length * LINE_DELAY + TAIL_DELAY)
        )

        return () => timers.forEach(clearTimeout)
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-terminal-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="status"
            aria-live="polite"
        >
            <div className="w-full max-w-md border border-terminal-border bg-terminal-panel p-5 font-mono">
                <div className="mb-4 flex items-center gap-2 border-b border-terminal-border pb-3">
                    <span className="terminal-dot bg-red-500" />
                    <span className="terminal-dot bg-yellow-400" />
                    <span className="terminal-dot bg-green-400" />
                    <span className="ml-2 text-xs text-terminal-text">
                        boot@portfolio: ~$
                    </span>
                </div>

                <div className="space-y-1.5 text-sm" aria-hidden="true">
                    {/* Full log for screen readers, revealed text for sighted users. */}
                    <span className="sr-only">
                        Booting portfolio. {BOOT_LINES.join(' ')}
                    </span>
                    {BOOT_LINES.map((line, i) => (
                        <motion.p
                            key={i}
                            className={
                                i === BOOT_LINES.length - 1
                                    ? 'text-terminal-accent'
                                    : 'text-terminal-green'
                            }
                            initial={{ opacity: 0, x: -8 }}
                            animate={
                                i < visibleLines
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -8 }
                            }
                            transition={{ duration: 0.18 }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                {visibleLines >= BOOT_LINES.length && (
                    <motion.p
                        className="mt-4 text-sm text-terminal-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        $ starting portfolio<span className="terminal-cursor">_</span>
                    </motion.p>
                )}
            </div>
        </motion.div>
    )
}

export default BootSequence