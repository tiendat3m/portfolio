import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isPointer, setIsPointer] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [trail, setTrail] = useState([])

    useEffect(() => {
        // Check if device supports hover (not mobile)
        const mediaQuery = window.matchMedia('(hover: hover)')
        if (!mediaQuery.matches) return

        setIsVisible(true)

        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })

            // Add to trail
            setTrail(prev => {
                const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]
                return newTrail.slice(-8) // Keep last 8 positions
            })

            // Check if hovering over clickable element
            const target = e.target
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.style.cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsPointer(isClickable)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', updatePosition)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: position.x - 10,
                    y: position.y - 10,
                    scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
                    opacity: 1
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                <div
                    className={`w-5 h-5 rounded-full bg-white transition-all duration-200 ${isPointer ? 'scale-150 opacity-50' : ''
                        }`}
                />
            </motion.div>

            {/* Cursor follower */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isClicking ? 0.5 : isPointer ? 0.8 : 1,
                    opacity: isPointer ? 0.5 : 0.3
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
            >
                <div
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${isPointer
                        ? 'border-accent-primary bg-accent-primary/10'
                        : 'border-white/50'
                        }`}
                />
            </motion.div>

            {/* Trail effect */}
            {trail.map((point, index) => (
                <motion.div
                    key={`trail-${point.id}-${index}`}
                    className="fixed top-0 left-0 pointer-events-none z-[9997]"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        left: point.x - 4,
                        top: point.y - 4
                    }}
                >
                    <div
                        className="w-2 h-2 rounded-full bg-accent-primary/30"
                        style={{
                            opacity: (index + 1) / trail.length * 0.5
                        }}
                    />
                </motion.div>
            ))}
        </>
    )
}

export default CustomCursor