import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCode, HiDesktopComputer, HiDatabase, HiSparkles } from 'react-icons/hi'
import SkillBar from '../ui/SkillBar'

const skillCategories = [
    {
        title: 'Primary Frontend Stack',
        icon: <HiDesktopComputer className="w-6 h-6" />,
        color: 'accent-primary',
        summary:
            'Build responsive product interfaces, dashboards, and admin workflows with modern component-based frontend architecture.',
        skills: [
            { name: 'React / Next.js', level: 92 },
            { name: 'Angular', level: 78 },
            { name: 'JavaScript / TypeScript', level: 90 },
            { name: 'HTML5 / CSS3', level: 93 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'Framer Motion', level: 80 }
        ]
    },
    {
        title: 'Backend Collaboration',
        icon: <HiCode className="w-6 h-6" />,
        color: 'accent-secondary',
        summary:
            'Comfortable working with API integration, admin systems, and supporting backend tasks when product delivery requires it.',
        skills: [
            { name: 'Node.js / Express', level: 72 },
            { name: 'Laravel / PHP', level: 68 },
            { name: 'RESTful APIs', level: 88 },
            { name: 'MySQL / PostgreSQL', level: 75 },
            { name: 'Supabase', level: 82 },
            { name: 'Git / GitHub', level: 90 }
        ]
    },
    {
        title: 'Workflow & Delivery',
        icon: <HiDatabase className="w-6 h-6" />,
        color: 'accent-tertiary',
        summary:
            'Used to shipping features in team environments with version control, review flows, and practical debugging/tooling habits.',
        skills: [
            { name: 'VS Code', level: 94 },
            { name: 'Git / GitHub', level: 90 },
            { name: 'Docker', level: 65 },
            { name: 'Postman', level: 85 },
            { name: 'Vite / Webpack', level: 80 },
            { name: 'Agile / Scrum', level: 82 }
        ]
    },
    {
        title: 'Design & Collaboration',
        icon: <HiSparkles className="w-6 h-6" />,
        color: 'accent-glow',
        summary:
            'Focus on clear UI implementation, responsive behaviour, and collaboration with teammates, designers, and product stakeholders.',
        skills: [
            { name: 'Figma', level: 80 },
            { name: 'Responsive Design', level: 92 },
            { name: 'UI/UX Principles', level: 85 },
            { name: 'Cross-browser Testing', level: 86 },
            { name: 'Performance Optimization', level: 83 },
            { name: 'Team Collaboration', level: 90 }
        ]
    }
]

const technologies = [
    'React',
    'Next.js',
    'Angular',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Laravel',
    'Tailwind',
    'Framer Motion',
    'PostgreSQL',
    'MySQL',
    'Supabase',
    'Docker',
    'Git',
    'REST API',
    'Figma',
    'VS Code'
]

const Skills = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id="skills" className="terminal-section section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">ls -la skills/</p>
                    <h2 className="terminal-heading text-3xl md:text-5xl">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-terminal-text/80">
                        A practical overview of the tools, workflows, and product-facing frontend
                        capabilities I use most in day-to-day work.
                    </p>
                </motion.div>

                <div className="mb-14 grid gap-5 md:grid-cols-2">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: catIndex * 0.1 }}
                            className="premium-card p-5"
                        >
                            <div className="relative z-10 mb-5 flex items-center gap-3">
                                <div className="border border-terminal-border bg-terminal-bg p-3 text-terminal-accent">
                                    {category.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-terminal-muted">
                                        drwxr-xr-x ./skills/{catIndex + 1}
                                    </p>
                                    <h3 className="text-xl font-medium text-terminal-green">
                                        {category.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <p className="mb-5 text-sm leading-6 text-terminal-text/80">
                                    <span className="text-terminal-muted">{'// '}</span>
                                    {category.summary}
                                </p>
                                <div>
                                    {category.skills.map((skill, sIndex) => (
                                        <SkillBar
                                            key={skill.name}
                                            label={skill.name}
                                            level={skill.level}
                                            delay={sIndex * 120}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <p className="terminal-command mb-6">find technologies -type f</p>
                    <div className="flex flex-wrap gap-3">
                        {technologies.map((tech, index) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.6 + index * 0.03 }}
                                className="premium-card cursor-default px-4 py-2 text-terminal-text hover:text-terminal-accent"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
                >
                    {[
                        { value: '3+', label: 'Years Experience' },
                        { value: '12+', label: 'Projects Completed' },
                        { value: '8+', label: 'Happy Clients' },
                        { value: '5+', label: 'Long-term Collaborations' }
                    ].map((stat, index) => (
                        <div key={index} className="premium-card p-5 text-center">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="mb-2 block text-3xl font-medium text-terminal-accent md:text-4xl"
                            >
                                {stat.value}
                            </motion.span>
                            <span className="text-sm text-terminal-text/70">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
