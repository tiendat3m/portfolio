import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'

const experiences = [
    {
        type: 'work',
        title: 'Senior Creative Developer',
        company: 'Digital Agency X',
        period: '2022 - Present',
        description: 'Leading development of immersive web experiences for Fortune 500 clients. Implementing cutting-edge WebGL and Three.js solutions.'
    },
    {
        type: 'work',
        title: 'Full Stack Developer',
        company: 'Tech Startup Y',
        period: '2020 - 2022',
        description: 'Built scalable web applications using React and Node.js. Led team of 4 developers and improved performance by 40%.'
    },
    {
        type: 'education',
        title: 'Computer Science Degree',
        company: 'University of Technology',
        period: '2016 - 2020',
        description: 'Graduated with honors. Specialized in Human-Computer Interaction and Visual Computing.'
    },
    {
        type: 'work',
        title: 'Junior Developer',
        company: 'Creative Studio Z',
        period: '2018 - 2020',
        description: 'Developed responsive websites and interactive animations. Collaborated with designers to create engaging user experiences.'
    }
]

const Experience = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id='experience' className='section-padding relative'>
            <div className='container-custom'>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className='text-center mb-16'
                >
                    <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>Journey</p>
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        Experience & <span className='gradient-text'>Education</span>
                    </h2>
                </motion.div>

                <div className='relative'>
                    <div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary' />

                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.2 }}
                                className={`relative flex items-start mb-12 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                <div className='absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-accent-primary transform -translate-x-1/2 mt-6 ring-4 ring-dark-950 z-10' />

                                <div className={`ml-20 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                                    <div className={`glass-card p-6 ${isLeft ? 'md:text-right' : ''}`}>
                                        <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                                            {exp.type === 'work' ? <HiBriefcase className='text-accent-primary' /> : <HiAcademicCap className='text-accent-secondary' />}
                                            <span className='text-accent-primary text-sm'>{exp.period}</span>
                                        </div>
                                        <h3 className='text-xl font-bold text-white mb-1'>{exp.title}</h3>
                                        <p className='text-accent-secondary font-medium mb-3'>{exp.company}</p>
                                        <p className='text-white/60 text-sm'>{exp.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            <div className='absolute top-1/4 right-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px]' />
        </section>
    )
}

export default Experience
