import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
    { name: 'React / Next.js', level: 95 },
    { name: 'Angular', level: 88 },
    { name: 'JavaScript / TypeScript', level: 92 },
    { name: 'HTML / CSS / Tailwind', level: 90 },
    { name: 'Node.js / Express', level: 75 },
    { name: 'AI Integration / Prompt Engineering', level: 78 },
    { name: 'Git / REST APIs', level: 85 }
]

const About = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id="about" className="terminal-section section-padding relative overflow-hidden">
            <div className="container-custom">
                <div ref={ref} className="grid items-start gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -34 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.28 }}
                    >
                        <span className="terminal-loading">Loading...</span>
                        <motion.p
                            className="terminal-command mb-4"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            cat about.md
                        </motion.p>

                        <motion.h2
                            className="terminal-heading mb-6 text-3xl md:text-5xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            Frontend engineer focused on
                            <span className="gradient-text"> product quality </span>
                            and practical delivery
                        </motion.h2>

                        <motion.div
                            className="space-y-4 border-l border-terminal-accent bg-terminal-surface/70 px-4 py-4 text-base leading-relaxed text-terminal-text"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            <p>
                                <span className="text-terminal-muted">{'// '}</span>
                                I’m a Frontend Developer at S3Corp based in Ho Chi Minh City with 3+
                                years of experience building web applications used in real business
                                environments.
                            </p>
                            <p>
                                <span className="text-terminal-muted">{'// '}</span>
                                My main strengths are React, Angular, JavaScript/TypeScript, and UI
                                implementation for dashboards, admin tools, and customer-facing
                                interfaces. I also work with REST APIs, backend collaboration, and
                                deployment workflows when needed.
                            </p>
                            <p>
                                <span className="text-terminal-muted">{'// '}</span>I care about
                                shipping clean, maintainable code and improving the usability of the
                                products I work on. Recently, I’ve also been exploring AI
                                integration patterns where they create clear value for users and
                                teams.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="#contact" className="btn-primary">
                                Get In Touch
                            </a>
                            <a href="/resume.html" className="btn-outline" target="_blank">
                                Download CV
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="premium-card p-5"
                        initial={{ opacity: 0, x: 34 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.34 }}
                    >
                        <div className="relative z-10">
                            <p className="terminal-command mb-5">ls -la core-skills/</p>
                            <h3 className="mb-6 text-xl font-medium text-terminal-green">
                                Core Skills
                            </h3>
                            <div className="space-y-4">
                                {skills.map((skill, index) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex justify-between gap-4 text-sm">
                                            <span className="text-terminal-text">
                                                <span className="text-terminal-muted">
                                                    -rwxr-xr-x
                                                </span>{' '}
                                                {skill.name}
                                            </span>
                                            <span className="text-terminal-accent">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 overflow-hidden border border-terminal-border bg-terminal-bg">
                                            <motion.div
                                                className="h-full bg-terminal-green"
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: skill.level + '%' } : {}}
                                                transition={{
                                                    duration: 0.75,
                                                    delay: 0.3 + index * 0.08
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
