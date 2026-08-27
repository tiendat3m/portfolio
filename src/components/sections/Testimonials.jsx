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
        <section
            id="testimonials"
            className="terminal-section section-padding relative overflow-hidden"
        >
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">tail -f reviews.log</p>
                    <h2 className="terminal-heading text-3xl md:text-5xl">
                        Work <span className="gradient-text">Reviews</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="relative mx-auto max-w-4xl"
                >
                    <div className="glass-card p-6 md:p-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                <div className="mb-6 flex justify-center gap-1">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <HiStar key={i} className="h-5 w-5 text-terminal-accent" />
                                    ))}
                                </div>

                                <p className="mb-8 text-center text-lg leading-relaxed text-terminal-text md:text-xl">
                                    <span className="text-terminal-muted">&gt; </span>
                                    {testimonials[currentIndex].content}
                                </p>

                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className="h-14 w-14 border border-terminal-border object-cover grayscale"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-medium text-terminal-green">
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className="text-sm text-terminal-accent">
                                            {testimonials[currentIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={prevSlide}
                            className="glass-card flex h-12 w-12 items-center justify-center text-terminal-green transition-colors hover:text-terminal-accent"
                            aria-label="Previous review"
                        >
                            <HiChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="glass-card flex h-12 w-12 items-center justify-center text-terminal-green transition-colors hover:text-terminal-accent"
                            aria-label="Next review"
                        >
                            <HiChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="mt-6 flex justify-center gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-6 border transition-colors ${
                                    index === currentIndex
                                        ? 'border-terminal-accent bg-terminal-accent'
                                        : 'border-terminal-border bg-terminal-bg'
                                }`}
                                aria-label={`Show review ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-14"
                >
                    <p className="terminal-command mb-6">cat tech-history.txt</p>
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        {['React', 'Vue', 'Tailwind', 'Node.js', 'TypeScript'].map((tech) => (
                            <span
                                key={tech}
                                className="border border-terminal-border bg-terminal-surface px-4 py-2 text-xl font-medium text-terminal-text/60 transition-colors hover:text-terminal-accent"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials
