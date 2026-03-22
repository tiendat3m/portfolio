import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import HeroScene from '../three/HeroScene'

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id='hero' className='relative h-screen w-full overflow-hidden'>
            <HeroScene mousePosition={mousePosition} />

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
                            Creative Developer & Designer
                        </motion.p>

                        <motion.h1
                            className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight'
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            Building{' '}
                            <span className='gradient-text'>Digital</span>
                            <br />
                            Experiences
                        </motion.h1>

                        <motion.p
                            className='text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                        >
                            I craft immersive web experiences that blend cutting-edge technology
                            with stunning visual design.
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
