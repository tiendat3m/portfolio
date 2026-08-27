import React, { useEffect, useState } from 'react'

// Detect reduced-motion once at module load so SSR/first paint stays stable.
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * TypingText — renders `text` with a character-by-character typewriter effect.
 *
 * Accessibility strategy:
 * The animated text is decorative. The full string is always present in the
 * DOM inside a visually-hidden (.sr-only) span, so screen readers announce
 * the complete text immediately instead of reading it character by character.
 * The typewriter layer is marked aria-hidden to stay out of the a11y tree.
 *
 * Performance: respects prefers-reduced-motion by printing the whole text
 * up front and skipping the interval timer entirely.
 */
const TypingText = ({
    text,
    speed = 32,
    delay = 0,
    className = '',
    cursor = true,
    as: Tag = 'span'
}) => {
    // Start with the full text when reduced motion is requested, empty otherwise.
    const [displayText, setDisplayText] = useState(() =>
        prefersReducedMotion() ? text : ''
    )

    useEffect(() => {
        // Reduced motion: show the full text and bail out — no timer.
        if (prefersReducedMotion()) {
            setDisplayText(text)
            return undefined
        }

        // Typewriter loop: reveal one character every `speed` ms after `delay`.
        setDisplayText('')
        let index = 0
        let interval
        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                index += 1
                setDisplayText(text.slice(0, index))

                // Stop once the full string is visible.
                if (index >= text.length) {
                    clearInterval(interval)
                }
            }, speed)
        }, delay)

        // Cleanup both pending timeout and running interval on unmount/change.
        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [delay, speed, text])

    return (
        <Tag className={className}>
            {/* Full text for assistive tech — visually hidden, always present. */}
            <span className="sr-only">{text}</span>
            {/* Animated typewriter layer — decorative, hidden from a11y tree. */}
            <span aria-hidden="true">
                {displayText}
                {cursor && <span className="terminal-cursor">_</span>}
            </span>
        </Tag>
    )
}

export default TypingText