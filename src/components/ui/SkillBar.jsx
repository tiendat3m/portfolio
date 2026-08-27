import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * SkillBar — terminal-style proficiency bar `[████░░] 80%`.
 *
 * Fills from 0 to `level` only when the bar scrolls into view, using
 * IntersectionObserver (via react-intersection-observer). Respects
 * prefers-reduced-motion by jumping straight to the final fill.
 *
 * The bar is rendered with block characters for the terminal aesthetic;
 * a visually-hidden percentage span keeps the value accessible to AT.
 */
const BLOCK_COUNT = 20

const SkillBar = ({ label, level = 80, delay = 0 }) => {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
    const [fill, setFill] = useState(0)
    const rafRef = useRef(null)

    useEffect(() => {
        if (!inView) return undefined

        // Reduced motion: snap to final value, no animation.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setFill(level)
            return undefined
        }

        // Animate fill 0 → level over ~900ms with easing.
        const duration = 900
        const startTime = performance.now() + delay

        const tick = (now) => {
            const elapsed = Math.max(0, now - startTime)
            const progress = Math.min(1, elapsed / duration)
            // easeOutCubic for a snappy terminal "load" feel.
            const eased = 1 - Math.pow(1 - progress, 3)
            setFill(Math.round(eased * level))
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }
        rafRef.current = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(rafRef.current)
    }, [inView, level, delay])

    const filledBlocks = Math.round((fill / 100) * BLOCK_COUNT)
    const bar =
        '█'.repeat(filledBlocks) + '░'.repeat(BLOCK_COUNT - filledBlocks)

    return (
        <div ref={ref} className="relative z-10 mb-4">
            <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-terminal-text">{label}</span>
                <span className="text-terminal-muted">{fill}%</span>
            </div>
            <div className="font-mono text-sm tracking-tight text-terminal-green" aria-hidden="true">
                <span className="text-terminal-muted">[</span>
                {bar}
                <span className="text-terminal-muted">]</span>
            </div>
            {/* Accessible value for screen readers. */}
            <span className="sr-only">
                {label}: {level} percent proficiency
            </span>
        </div>
    )
}

export default SkillBar