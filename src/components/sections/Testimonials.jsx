import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi'

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO, TechStart Inc.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        content: 'Working with this team was an absolute pleasure. They delivered a stunning website that exceeded our expectations. The attention to detail and creative solutions were impressive.',
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Product Manager, InnovateTech',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        content: 'The 3D visualizations they created for our product launch were game-changing. Our engagement rates increased by 150% after implementing their interactive features.',
        rating: 5
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Marketing Director, BrandCo',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        content: 'Exceptional design skills combined with technical expertise. They transformed our outdated website into a modern, high-performing platform that our customers love.',
        rating: 5
    },
    {
        id: 4,
        name: 'David Kim',
        role: 'Founder, StartupXYZ',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        content: 'Fast turnaround, excellent communication, and top-notch quality. They delivered our MVP in record time without compromising on quality. Highly recommended!',
        rating: 5
    },
    {
        id: 5,
        name: 'Lisa Wang',
        role: 'Director, Creative Agency',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
        content: 'A true professional who understands both design and development. The animations and interactions they created brought our vision to life perfectly.',
        rating: 5
    }
]

const Testimonials = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section id='testimonials' className='section-padding relative overflow-hidden'>
            <div className='container-custom'>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className='text-center mb-16'
                >
                    <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>
                        Testimonials
                    </p>
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        What Clients <span className='gradient-text'>Say</span>
                    </h2>
                </motion.div>

                {/* Main Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className='relative max-w-4xl mx-auto'
                >
                    <div className='glass-card p-8 md:p-12'>
                        <div className='absolute top-6 left-8 text-6xl text-accent-primary/20 font-serif'>"</div>

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className='relative z-10'
                            >
                                {/* Rating */}
                                <div className='flex justify-center gap-1 mb-6'>
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <HiStar key={i} className='w-5 h-5 text-yellow-400 fill-current' />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className='text-white/80 text-lg md:text-xl text-center mb-8 leading-relaxed'>
                                    {testimonials[currentIndex].content}
                                </p>

                                {/* Author */}
                                <div className='flex items-center justify-center gap-4'>
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className='w-14 h-14 rounded-full object-cover ring-2 ring-accent-primary'
                                    />
                                    <div className='text-left'>
                                        <h4 className='text-white font-semibold'>{testimonials[currentIndex].name}</h4>
                                        <p className='text-accent-primary text-sm'>{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex justify-center gap-4 mt-8'>
                        <button
                            onClick={prevSlide}
                            className='w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-accent-primary transition-colors'
                        >
                            <HiChevronLeft className='w-6 h-6' />
                        </button>
                        <button
                            onClick={nextSlide}
                            className='w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-accent-primary transition-colors'
                        >
                            <HiChevronRight className='w-6 h-6' />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className='flex justify-center gap-2 mt-6'>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-accent-primary' : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Client Logos */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className='mt-16'
                >
                    <p className='text-center text-white/40 text-sm mb-8'>Trusted by leading companies</p>
                    <div className='flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50'>
                        {['Google', 'Microsoft', 'Apple', 'Meta', 'Netflix'].map((brand) => (
                            <span key={brand} className='text-2xl font-bold text-white/30 hover:text-white/50 transition-colors'>
                                {brand}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background decorations */}
            <div className='absolute top-1/4 left-0 w-72 h-72 bg-accent-secondary/10 rounded-full blur-[120px]' />
            <div className='absolute bottom-1/4 right-0 w-72 h-72 bg-accent-primary/10 rounded-full blur-[120px]' />
        </section>
    )
}

export default Testimonials