import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown, HiSparkles, HiLightningBolt, HiShieldCheck } from 'react-icons/hi'

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
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-28 pb-16 sm:pt-32"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(99,102,241,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.32)_100%)]" />
            <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-primary/10 blur-[110px]" />

            <div className="relative z-10 flex min-h-[calc(100vh-10rem)] items-center">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mx-auto max-w-5xl text-center"
                    >
                        <motion.p
                            className="section-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            Frontend Developer • React / Angular • Ho Chi Minh City
                        </motion.p>

                        <motion.h1
                            className="mx-auto mb-6 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                        >
                            Building reliable frontend experiences for
                            <span className="gradient-text"> real products </span>
                            and business workflows.
                        </motion.h1>

                        <motion.p
                            className="mx-auto mb-8 max-w-3xl text-base leading-8 text-white/60 sm:text-lg md:text-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            I build responsive web applications, admin dashboards, and internal
                            tools with React, Angular, and modern frontend practices — with a focus
                            on maintainability, UX quality, and performance in production.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
                            className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            {highlights.map(({ icon: Icon, label }) => (
                                <div key={label} className="premium-card rounded-2xl px-4 py-3">
                                    <div className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium text-white/70">
                                        <Icon className="h-4 w-4 text-accent-primary" />
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.button
                onClick={scrollToAbout}
                className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <HiArrowDown className="w-6 h-6" />
            </motion.button>
        </section>
    )
}

export default Hero
