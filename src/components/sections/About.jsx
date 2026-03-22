import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
    { name: 'React / Next.js', level: 95 },
    { name: 'Three.js / WebGL', level: 88 },
    { name: 'JavaScript / TypeScript', level: 92 },
    { name: 'Node.js / Express', level: 85 },
    { name: 'Tailwind CSS / GSAP', level: 90 },
    { name: 'Python / Django', level: 78 }
]

const About = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id='about' className='section-padding relative overflow-hidden'>
            <div className='container-custom'>
                <div ref={ref} className='grid lg:grid-cols-2 gap-16 items-center'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            About Me
                        </motion.p>

                        <motion.h2
                            className='text-4xl md:text-5xl font-bold text-white mb-6'
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            Crafting <span className='gradient-text'>Immersive</span> Digital Worlds
                        </motion.h2>

                        <motion.div
                            className='space-y-4 text-white/60 text-lg leading-relaxed'
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            <p>I'm a passionate developer and designer based in Ho Chi Minh City, Vietnam, with 3+ years of experience creating immersive digital experiences.</p>
                            <p>I specialize in building interactive web applications using cutting-edge technologies like React, Three.js, and modern animation libraries. My goal is to blend stunning visual design with performant code.</p>
                            <p>When I'm not coding, I'm exploring new design trends, experimenting with 3D graphics, or contributing to open-source projects. I believe in continuous learning and staying updated with the latest technologies.</p>
                            <p>I'm always excited to take on new challenges and collaborate on innovative projects. Whether you need a portfolio website, an interactive 3D experience, or a full-stack application, I'm here to bring your vision to life.</p>
                        </motion.div>

                        <motion.div
                            className='mt-8 flex gap-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                        >
                            <a href='#contact' className='btn-primary'>Get In Touch</a>
                            <a href='/resume.pdf' className='btn-outline' target='_blank'>Download CV</a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className='space-y-6'
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className='text-xl font-semibold text-white mb-6'>Core Skills</h3>
                        {skills.map((skill, index) => (
                            <div key={skill.name} className='space-y-2'>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-white/80'>{skill.name}</span>
                                    <span className='text-accent-primary'>{skill.level}%</span>
                                </div>
                                <div className='h-2 bg-white/10 rounded-full overflow-hidden'>
                                    <motion.div
                                        className='h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full'
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

            <div className='absolute top-1/2 left-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2' />
        </section>
    )
}

export default About
