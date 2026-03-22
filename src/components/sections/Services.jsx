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
        icon: <HiDesktopComputer className='w-8 h-8' />,
        title: 'Web Development',
        description: 'Building responsive, high-performance web applications with modern technologies like React, Next.js, and Node.js.',
        features: ['Custom Web Apps', 'E-commerce Solutions', 'CMS Development', 'API Integration']
    },
    {
        icon: <HiDeviceMobile className='w-8 h-8' />,
        title: 'Mobile Development',
        description: 'Creating cross-platform mobile applications that deliver native-like experiences on iOS and Android.',
        features: ['React Native Apps', 'PWA Development', 'App Optimization', 'Push Notifications']
    },
    {
        icon: <HiLightBulb className='w-8 h-8' />,
        title: 'UI/UX Design',
        description: 'Designing intuitive user interfaces and experiences that engage users and drive conversions.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
        icon: <HiCode className='w-8 h-8' />,
        title: '3D & WebGL',
        description: 'Creating immersive 3D experiences and interactive visualizations for the web.',
        features: ['Three.js Development', 'WebGL Shaders', '3D Product Views', 'Interactive Graphics']
    },
    {
        icon: <HiLightningBolt className='w-8 h-8' />,
        title: 'Performance Optimization',
        description: 'Optimizing web applications for speed, SEO, and exceptional user experience.',
        features: ['Core Web Vitals', 'Bundle Optimization', 'Caching Strategies', 'SEO Enhancement']
    },
    {
        icon: <HiCog className='w-8 h-8' />,
        title: 'Consulting & Strategy',
        description: 'Providing technical consulting and strategic guidance for your digital projects.',
        features: ['Tech Stack Selection', 'Architecture Review', 'Code Audits', 'Team Training']
    }
]

const Services = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id='services' className='section-padding relative'>
            <div className='container-custom'>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className='text-center mb-16'
                >
                    <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>
                        What I Offer
                    </p>
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        My <span className='gradient-text'>Services</span>
                    </h2>
                </motion.div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className='glass-card p-8 group cursor-pointer'
                        >
                            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center mb-6 group-hover:from-accent-primary/30 group-hover:to-accent-secondary/30 transition-colors'>
                                <span className='text-accent-primary group-hover:text-white transition-colors'>
                                    {service.icon}
                                </span>
                            </div>

                            <h3 className='text-xl font-bold text-white mb-3'>{service.title}</h3>
                            <p className='text-white/60 mb-6'>{service.description}</p>

                            <ul className='space-y-2'>
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className='flex items-center gap-2 text-white/70 text-sm'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-accent-primary' />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className='text-center mt-16'
                >
                    <p className='text-white/60 mb-6'>Have a project in mind? Let's work together!</p>
                    <a href='#contact' className='btn-primary'>
                        Get In Touch
                    </a>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className='absolute top-1/3 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[150px]' />
            <div className='absolute bottom-1/3 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[150px]' />
        </section>
    )
}

export default Services