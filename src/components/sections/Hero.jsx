import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown, HiSparkles, HiLightningBolt, HiShieldCheck } from 'react-icons/hi'
import TypingText from '../ui/TypingText'
import MatrixRain from '../ui/MatrixRain'

const highlights = [
    { icon: HiSparkles, label: 'Product-minded frontend' },
    { icon: HiLightningBolt, label: 'Performance focused' },
    { icon: HiShieldCheck, label: 'Production-ready delivery' }
]

const Hero = () => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="terminal-section relative min-h-[calc(100vh-7rem)] w-full overflow-hidden pt-16 pb-16 sm:pt-20"
        >
            {/* Matrix rain background — low opacity, off on mobile/reduced-motion. */}
            <MatrixRain />

            <div className="relative z-10 flex min-h-[calc(100vh-13rem)] items-center">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mx-auto max-w-5xl"
                    >
                        <motion.p
                            className="terminal-command mb-5 inline-flex border border-terminal-border bg-terminal-surface px-3 py-2 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            <TypingText
                                text="./start.sh && whoami"
                                speed={36}
                                delay={180}
                                cursor={false}
                            />
                        </motion.p>

                        <motion.p
                            className="mb-4 text-sm text-terminal-text/70"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                        >
                            Frontend Developer • React / Angular • Ho Chi Minh City
                        </motion.p>

                        <motion.h1
                            className="terminal-heading glitch-hover mb-6 max-w-5xl text-3xl leading-tight text-terminal-green sm:text-5xl md:text-6xl lg:text-7xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                        >
                            <TypingText
                                text="Building reliable frontend experiences for real products and business workflows."
                                speed={16}
                                delay={520}
                            />
                        </motion.h1>

                        <motion.p
                            className="terminal-output mb-8 max-w-3xl border-l border-terminal-accent bg-terminal-surface/70 px-4 py-3 text-base leading-8 sm:text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            <span className="text-terminal-muted">{'// '}</span>I build responsive
                            web applications, admin dashboards, and internal tools with React,
                            Angular, and modern frontend practices — with a focus on
                            maintainability, UX quality, and performance in production.
                        </motion.p>

                        <motion.div
                            className="flex flex-col gap-4 sm:flex-row"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                        >
                            <a href="#projects" className="btn-primary">
                                View My Work
                            </a>
                            <a href="#contact" className="btn-outline">
                                Get In Touch
                            </a>
                        </motion.div>

                        <motion.div
                            className="mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            {highlights.map(({ icon: Icon, label }) => (
                                <div key={label} className="premium-card px-4 py-3">
                                    <div className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium text-terminal-text/80">
                                        <Icon className="h-4 w-4 text-terminal-accent" />
                                        <span className="text-terminal-muted">drwxr-xr-x</span>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.button
                onClick={scrollToAbout}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 text-terminal-muted transition-colors hover:text-terminal-accent sm:bottom-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                aria-label="Scroll to about"
            >
                <HiArrowDown className="w-6 h-6" />
            </motion.button>
        </section>
    )
}

export default Hero
