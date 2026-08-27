import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
    HiDesktopComputer,
    HiDeviceMobile,
    HiLightBulb,
    HiCode,
    HiLightningBolt,
    HiCog
} from 'react-icons/hi'

const services = [
    {
        icon: <HiDesktopComputer className="w-8 h-8" />,
        title: 'Web Development',
        description:
            'Building responsive, high-performance web applications with modern technologies like React, Next.js, and Angular.',
        features: ['Custom Web Apps', 'Dashboard Development', 'CMS Integration', 'API Integration']
    },
    {
        icon: <HiLightBulb className="w-8 h-8" />,
        title: 'UI/UX Implementation',
        description:
            'Transforming designs into pixel-perfect, responsive interfaces with smooth animations and interactions.',
        features: ['Responsive Design', 'CSS Animations', 'Framer Motion', 'Accessibility']
    },
    {
        icon: <HiCode className="w-8 h-8" />,
        title: 'Component Development',
        description:
            'Building reusable, scalable component libraries and design systems for consistent user interfaces.',
        features: ['Design Systems', 'Component Libraries', 'Storybook', 'Documentation']
    },
    {
        icon: <HiLightningBolt className="w-8 h-8" />,
        title: 'Performance Optimization',
        description: 'Optimizing web applications for speed, SEO, and exceptional user experience.',
        features: ['Core Web Vitals', 'Bundle Optimization', 'Lazy Loading', 'Code Splitting']
    },
    {
        icon: <HiCog className="w-8 h-8" />,
        title: 'Frontend Architecture',
        description:
            'Designing scalable frontend architecture and state management solutions for complex applications.',
        features: ['State Management', 'Project Setup', 'Best Practices', 'Code Reviews']
    },
    {
        icon: <HiDesktopComputer className="w-8 h-8" />,
        title: 'Enterprise Applications',
        description:
            'Developing robust enterprise-level applications with authentication, authorization, and data management.',
        features: [
            'Admin Dashboards',
            'Authentication Systems',
            'Data Visualization',
            'Reporting Tools'
        ]
    },
    {
        icon: <HiDeviceMobile className="w-8 h-8" />,
        title: 'AI Integration & AI Agents',
        description:
            'Integrating AI-powered features and lightweight AI agent workflows into web products to improve automation and user experience.',
        features: [
            'Prompt Workflows',
            'AI-assisted Content',
            'Chat/Assistant UI',
            'Automation Flows'
        ]
    }
]

const Services = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id="services" className="terminal-section section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">cat services.json</p>
                    <h2 className="terminal-heading text-3xl md:text-5xl">
                        My <span className="gradient-text">Services</span>
                    </h2>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="glass-card terminal-row-link group cursor-pointer p-6"
                        >
                            <div className="relative z-10 mb-5 flex items-center gap-3">
                                <div className="border border-terminal-border bg-terminal-bg p-3 text-terminal-accent transition-colors group-hover:text-terminal-green">
                                    {service.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-terminal-muted">
                                        service[{index.toString().padStart(2, '0')}]
                                    </p>
                                    <h3 className="terminal-underline text-xl font-medium text-terminal-green">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="relative z-10 mb-6 text-sm leading-6 text-terminal-text/80">
                                <span className="text-terminal-muted">{'// '}</span>
                                {service.description}
                            </p>

                            <ul className="relative z-10 space-y-2">
                                {service.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-center gap-2 text-sm text-terminal-text/75"
                                    >
                                        <span className="text-terminal-accent">&gt;</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-14"
                >
                    <p className="mb-6 text-terminal-text/70">
                        <span className="text-terminal-muted">{'// '}</span>
                        Have a project in mind? Let's work together!
                    </p>
                    <a href="#contact" className="btn-primary">
                        Get In Touch
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default Services
