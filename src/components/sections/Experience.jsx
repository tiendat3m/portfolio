import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'

const experiences = [
    {
        type: 'work',
        title: 'Frontend Developer',
        company: 'S3Corp',
        period: '2023 - Present',
        description:
            'Build and maintain business web applications with React and Angular, focusing on responsive UI, admin workflows, API integration, and day-to-day product delivery with cross-functional teams.'
    },
    {
        type: 'work',
        title: 'Junior Frontend Developer',
        company: 'S3Corp',
        period: '2022 - 2023',
        description:
            'Worked on responsive frontend features, reusable components, and internal product improvements while strengthening fundamentals in React, TypeScript, and team-based development practices.'
    },
    {
        type: 'education',
        title: 'Bachelor of Information Technology',
        company: 'University of Information Technology',
        period: '2020 - 2024',
        description:
            'Studied software engineering fundamentals including programming, data structures, web development, and software design — providing the technical base for product-focused frontend work.'
    },
    {
        type: 'work',
        title: 'Internship',
        company: 'S3Corp',
        period: '2021 - 2022',
        description:
            'Supported frontend implementation tasks, built basic React components, and gained hands-on experience with real project workflows, code reviews, and delivery standards.'
    }
]

const Experience = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id="experience" className="terminal-section section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">history | grep career</p>
                    <h2 className="terminal-heading text-3xl md:text-5xl">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                </motion.div>

                <div className="relative space-y-5">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-terminal-green/30 md:left-1/2" />

                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -34 : 34 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.16 }}
                                className={`relative flex items-start ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                <div className="absolute left-4 z-10 mt-6 h-3 w-3 -translate-x-1/2 border border-terminal-accent bg-terminal-bg md:left-1/2" />

                                <div
                                    className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:ml-auto md:pl-10'}`}
                                >
                                    <div className="glass-card p-5">
                                        <div
                                            className={`relative z-10 flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}
                                        >
                                            {exp.type === 'work' ? (
                                                <HiBriefcase className="text-terminal-accent" />
                                            ) : (
                                                <HiAcademicCap className="text-terminal-accent" />
                                            )}
                                            <span className="text-sm text-terminal-accent">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <div
                                            className={`relative z-10 ${isLeft ? 'md:text-right' : ''}`}
                                        >
                                            <p className="text-xs text-terminal-muted">
                                                ./timeline/{exp.type}/{index + 1}
                                            </p>
                                            <h3 className="mb-1 text-xl font-medium text-terminal-green">
                                                {exp.title}
                                            </h3>
                                            <p className="mb-3 font-medium text-terminal-accent">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm leading-6 text-terminal-text/80">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Experience
