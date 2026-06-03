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
        <section id="about" className="section-padding relative overflow-hidden">
            <div className="container-custom">
                <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            About Me
                        </motion.p>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            Frontend engineer focused on
                            <span className="gradient-text"> product quality </span>
                            and practical delivery
                        </motion.h2>

                        <motion.div
                            className="space-y-4 text-white/60 text-lg leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            <p>
                                I’m a Frontend Developer at S3Corp based in Ho Chi Minh City with 3+
                                years of experience building web applications used in real business
                                environments.
                            </p>
                            <p>
                                My main strengths are React, Angular, JavaScript/TypeScript, and UI
                                implementation for dashboards, admin tools, and customer-facing
                                interfaces. I also work with REST APIs, backend collaboration, and
                                deployment workflows when needed.
                            </p>
                            <p>
                                I care about shipping clean, maintainable code and improving the
                                usability of the products I work on. Recently, I’ve also been
                                exploring AI integration patterns where they create clear value for
                                users and teams.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex gap-4"
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
                        className="space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold text-white mb-6">Core Skills</h3>
                        {skills.map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/80">{skill.name}</span>
                                    <span className="text-accent-primary">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: skill.level + '%' } : {}}
                                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        </section>
    )
}

export default About
