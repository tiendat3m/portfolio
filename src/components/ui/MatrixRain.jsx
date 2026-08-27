import React, { useEffect, useRef } from 'react'

/**
 * MatrixRain — subtle Matrix-style falling characters behind the hero.
 *
 * Performance budget:
 *   - Capped at ~30fps via a timestamp gate (no point running 60fps for bg).
 *   - Disabled entirely on mobile (<= 640px) and prefers-reduced-motion.
 *   - Canvas is positioned absolutely, pointer-events none, low opacity so
 *     it never competes with hero content.
 *
 * Uses a single rAF loop + DPR-aware sizing. The character set is katakana +
 * latin + digits for the classic Matrix look.
 */
const CHARS =
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF<>=+-*/{}[]'

const FPS_CAP = 30
const MOBILE_BREAKPOINT = 640

const MatrixRain = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        // Skip on mobile or reduced motion — saves CPU/battery.
        if (reduceMotion || window.innerWidth <= MOBILE_BREAKPOINT) {
            return undefined
        }

        const ctx = canvas.getContext('2d')
        let width = 0
        let height = 0
        let columns = 0
        let drops = []
        const fontSize = 16

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = canvas.offsetWidth
            height = canvas.offsetHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            columns = Math.floor(width / fontSize)
            // Re-init drop positions; randomize start so columns don't sync.
            drops = Array.from({ length: columns }, () =>
                Math.floor((Math.random() * height) / fontSize)
            )
        }
        resize()

        const onResize = () => resize()
        window.addEventListener('resize', onResize)

        let lastFrame = 0
        let rafId = 0

        const draw = (now) => {
            rafId = requestAnimationFrame(draw)
            // Gate to ~30fps.
            if (now - lastFrame < 1000 / FPS_CAP) return
            lastFrame = now

            // Fade trail: translucent black rect each frame.
            ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
            ctx.fillRect(0, 0, width, height)

            ctx.font = `${fontSize}px "Fira Code", monospace`

            for (let i = 0; i < columns; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)]
                const x = i * fontSize
                const y = drops[i] * fontSize
                // Leading character brighter, trail dimmer.
                ctx.fillStyle = Math.random() > 0.975 ? '#aaffbf' : '#00ff41'
                ctx.fillText(char, x, y)

                // Reset drop to top randomly for uneven flow.
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i] += 1
            }
        }
        rafId = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        />
    )
}

export default MatrixRain