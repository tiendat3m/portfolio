import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'

const Hero = () => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id='hero' className='relative h-screen w-full overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900'>
            {/* Simple gradient background instead of 3D */}
            <div className='absolute inset-0 bg-gradient-radial from-accent-primary/5 via-transparent to-transparent' />

            <div className='absolute inset-0 flex items-center justify-center z-10'>
                <div className='container-custom text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <motion.p
                            className='text-accent-glow text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Frontend Developer • AI Agent Enthusiast
                        </motion.p>

                        <motion.h1
                            className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight'
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            Building{' '}
                            <span className='gradient-text'>Modern & AI-Powered</span>
                            <br />
                            Web Experiences
                        </motion.h1>

                        <motion.p
                            className='text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                        >
                            Frontend Developer at S3Corp with 3+ years of experience building
                            scalable web applications. Recently focused on integrating AI features,
                            AI workflows, and AI agents into modern React/Angular products.
                        </motion.p>

                        <motion.div
                            className='flex flex-col sm:flex-row items-center justify-center gap-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 }}
                        >
                            <a href='#projects' className='btn-primary'>
                                View My Work
                            </a>
                            <a href='#contact' className='btn-outline'>
                                Get In Touch
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.button
                onClick={scrollToAbout}
                className='absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, y: { repeat: Infinity, duration: 2 } }}
            >
                <HiArrowDown className='w-6 h-6' />
            </motion.button>
        </section>
    )
}

export default Hero
