import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi'

const testimonials = [
    {
        id: 1,
        name: 'Team Collaboration',
        role: 'Work Environment',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
        content:
            'I thrive in collaborative team environments, actively participating in code reviews, sharing knowledge with colleagues, and contributing to a positive development culture.',
        rating: 5
    },
    {
        id: 2,
        name: 'Continuous Learning',
        role: 'Professional Growth',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150',
        content:
            'Committed to continuous improvement through online courses, documentation, and hands-on practice. Always eager to learn new technologies and best practices.',
        rating: 5
    },
    {
        id: 3,
        name: 'Quality-Focused',
        role: 'Development Approach',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150',
        content:
            'I prioritize clean, maintainable code and follow industry best practices. Every project is an opportunity to deliver high-quality work that exceeds expectations.',
        rating: 5
    },
    {
        id: 4,
        name: 'Problem Solving',
        role: 'Technical Skills',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc51b0?w=150',
        content:
            'Strong analytical skills with a methodical approach to debugging and problem-solving. I enjoy tackling challenging technical issues and finding elegant solutions.',
        rating: 5
    },
    {
        id: 5,
        name: 'Frontend Specialization',
        role: 'Core Expertise',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150',
        content:
            'Specialized in building responsive, accessible, and performant web interfaces. Proficient in React ecosystem and modern CSS frameworks.',
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
        <section id="testimonials" className="section-padding relative overflow-hidden">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4">
                        Feedback
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Work <span className="gradient-text">Reviews</span>
                    </h2>
                </motion.div>

                {/* Main Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="relative max-w-4xl mx-auto"
                >
                    <div className="glass-card p-8 md:p-12">
                        <div className="absolute top-6 left-8 text-6xl text-accent-primary/20 font-serif">
                            "
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                {/* Rating */}
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <HiStar
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-white/80 text-lg md:text-xl text-center mb-8 leading-relaxed">
                                    {testimonials[currentIndex].content}
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className="w-14 h-14 rounded-full object-cover ring-2 ring-accent-primary"
                                    />
                                    <div className="text-left">
                                        <h4 className="text-white font-semibold">
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className="text-accent-primary text-sm">
                                            {testimonials[currentIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-accent-primary transition-colors"
                        >
                            <HiChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-accent-primary transition-colors"
                        >
                            <HiChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentIndex ? 'bg-accent-primary' : 'bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Technologies Worked With */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <p className="text-center text-white/40 text-sm mb-8">
                        Technologies worked with
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
                        {['React', 'Vue', 'Tailwind', 'Node.js', 'TypeScript'].map((tech) => (
                            <span
                                key={tech}
                                className="text-2xl font-bold text-white/30 hover:text-white/50 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent-secondary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent-primary/10 rounded-full blur-[120px]" />
        </section>
    )
}

export default Testimonials
