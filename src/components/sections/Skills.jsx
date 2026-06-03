import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCode, HiDesktopComputer, HiDatabase, HiSparkles } from 'react-icons/hi'

const skillCategories = [
    {
        title: 'Primary Frontend Stack',
        icon: <HiDesktopComputer className="w-6 h-6" />,
        color: 'accent-primary',
        summary:
            'Build responsive product interfaces, dashboards, and admin workflows with modern component-based frontend architecture.',
        skills: [
            'React / Next.js',
            'Angular',
            'JavaScript / TypeScript',
            'HTML5 / CSS3',
            'Tailwind CSS',
            'Framer Motion'
        ]
    },
    {
        title: 'Backend Collaboration',
        icon: <HiCode className="w-6 h-6" />,
        color: 'accent-secondary',
        summary:
            'Comfortable working with API integration, admin systems, and supporting backend tasks when product delivery requires it.',
        skills: [
            'Node.js / Express',
            'Laravel / PHP',
            'RESTful APIs',
            'MySQL / PostgreSQL',
            'Supabase',
            'Git / GitHub'
        ]
    },
    {
        title: 'Workflow & Delivery',
        icon: <HiDatabase className="w-6 h-6" />,
        color: 'accent-tertiary',
        summary:
            'Used to shipping features in team environments with version control, review flows, and practical debugging/tooling habits.',
        skills: ['VS Code', 'Git / GitHub', 'Docker', 'Postman', 'Vite / Webpack', 'Agile / Scrum']
    },
    {
        title: 'Design & Collaboration',
        icon: <HiSparkles className="w-6 h-6" />,
        color: 'accent-glow',
        summary:
            'Focus on clear UI implementation, responsive behaviour, and collaboration with teammates, designers, and product stakeholders.',
        skills: [
            'Figma',
            'Responsive Design',
            'UI/UX Principles',
            'Cross-browser Testing',
            'Performance Optimization',
            'Team Collaboration'
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
        <section id="skills" className="section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="section-kicker mb-4">Expertise</p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-white">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-white/60">
                        A practical overview of the tools, workflows, and product-facing frontend
                        capabilities I use most in day-to-day work.
                    </p>
                </motion.div>

                {/* Skill Categories */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: catIndex * 0.1 }}
                            className="premium-card rounded-3xl p-6"
                        >
                            <div className="relative z-10 flex items-center gap-3 mb-6">
                                <div
                                    className={`rounded-2xl bg-white/5 p-3 text-${category.color}`}
                                >
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                            </div>

                            <div className="relative z-10">
                                <p className="mb-5 text-sm leading-6 text-white/60">
                                    {category.summary}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/75"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technologies Cloud */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <h3 className="text-xl font-bold text-white mb-8">Technologies I Work With</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {technologies.map((tech, index) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.6 + index * 0.03 }}
                                className="premium-card rounded-full px-4 py-2 text-white/70 hover:text-white cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
                >
                    {[
                        { value: '3+', label: 'Years Experience' },
                        { value: '12+', label: 'Projects Completed' },
                        { value: '8+', label: 'Happy Clients' },
                        { value: '5+', label: 'Long-term Collaborations' }
                    ].map((stat, index) => (
                        <div key={index} className="premium-card rounded-3xl p-6 text-center">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="text-4xl md:text-5xl font-bold gradient-text block mb-2"
                            >
                                {stat.value}
                            </motion.span>
                            <span className="text-white/60 text-sm">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent-secondary/10 rounded-full blur-[120px]" />
        </section>
    )
}

export default Skills
