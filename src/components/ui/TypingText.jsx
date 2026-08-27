import React, { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const TypingText = ({
    text,
    speed = 32,
    delay = 0,
    className = '',
    cursor = true,
    as: Tag = 'span'
}) => {
    const [displayText, setDisplayText] = useState(() => (prefersReducedMotion() ? text : ''))

    useEffect(() => {
        if (prefersReducedMotion()) {
            setDisplayText(text)
            return undefined
        }

        setDisplayText('')
        let index = 0
        let interval
        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                index += 1
                setDisplayText(text.slice(0, index))

                if (index >= text.length) {
                    clearInterval(interval)
                }
            }, speed)
        }, delay)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [delay, speed, text])

    return (
        <Tag className={className}>
            {displayText}
            {cursor && (
                <span className="terminal-cursor" aria-hidden="true">
                    _
                </span>
            )}
        </Tag>
    )
}

export default TypingText
