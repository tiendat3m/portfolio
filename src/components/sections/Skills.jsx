import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCode, HiDesktopComputer, HiDatabase, HiSparkles } from 'react-icons/hi'

const skillCategories = [
    {
        title: 'Frontend Development',
        icon: <HiDesktopComputer className="w-6 h-6" />,
        color: 'accent-primary',
        skills: [
            { name: 'React / Next.js', level: 95 },
            { name: 'Angular', level: 88 },
            { name: 'JavaScript / TypeScript', level: 92 },
            { name: 'HTML5 / CSS3', level: 95 },
            { name: 'Tailwind CSS', level: 90 },
            { name: 'Framer Motion', level: 85 }
        ]
    },
    {
        title: 'Backend Development',
        icon: <HiCode className="w-6 h-6" />,
        color: 'accent-secondary',
        skills: [
            { name: 'Node.js / Express', level: 75 },
            { name: 'Laravel / PHP', level: 70 },
            { name: 'RESTful APIs', level: 90 },
            { name: 'MySQL / PostgreSQL', level: 80 },
            { name: 'Supabase', level: 75 },
            { name: 'Git / GitHub', level: 95 }
        ]
    },
    {
        title: 'Tools & Workflow',
        icon: <HiDatabase className="w-6 h-6" />,
        color: 'accent-tertiary',
        skills: [
            { name: 'VS Code', level: 95 },
            { name: 'Git / GitHub', level: 90 },
            { name: 'Docker', level: 70 },
            { name: 'Postman', level: 85 },
            { name: 'Vite / Webpack', level: 80 },
            { name: 'Agile / Scrum', level: 85 }
        ]
    },
    {
        title: 'Design & Collaboration',
        icon: <HiSparkles className="w-6 h-6" />,
        color: 'accent-glow',
        skills: [
            { name: 'Figma', level: 85 },
            { name: 'Responsive Design', level: 95 },
            { name: 'UI/UX Principles', level: 80 },
            { name: 'Cross-browser Testing', level: 85 },
            { name: 'Performance Optimization', level: 80 },
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
        <section id="skills" className="section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4">
                        Expertise
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                </motion.div>

                {/* Skill Categories */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: catIndex * 0.1 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`text-${category.color}`}>{category.icon}</div>
                                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                            </div>

                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-white/80 text-sm">
                                                {skill.name}
                                            </span>
                                            <span className="text-accent-primary text-sm">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: `${skill.level}%` } : {}}
                                                transition={{
                                                    delay: catIndex * 0.1 + skillIndex * 0.05,
                                                    duration: 1,
                                                    ease: 'easeOut'
                                                }}
                                                className={`h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary rounded-full`}
                                            />
                                        </div>
                                    </div>
                                ))}
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
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="px-4 py-2 glass-card text-white/70 hover:text-white hover:border-accent-primary cursor-default transition-colors"
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
                        <div key={index} className="glass-card p-6 text-center">
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
