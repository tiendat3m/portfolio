import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCode, HiX } from 'react-icons/hi'

const projects = [
    {
        id: 1,
        title: 'Immersive 3D Dashboard',
        category: 'Web Development',
        description: 'A real-time data visualization dashboard with interactive 3D elements and smooth animations.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        tags: ['React', 'Three.js', 'GSAP', 'D3.js'],
        link: '#',
        github: '#'
    },
    {
        id: 2,
        title: 'E-Commerce Platform',
        category: 'Full Stack',
        description: 'Modern e-commerce solution with AR product preview and AI-powered recommendations.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
        link: '#',
        github: '#'
    },
    {
        id: 3,
        title: 'Creative Agency Website',
        category: 'Design & Development',
        description: 'Award-winning agency website featuring scroll-driven animations and WebGL effects.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        tags: ['React', 'Framer Motion', 'WebGL', 'Tailwind'],
        link: '#',
        github: '#'
    },
    {
        id: 4,
        title: 'AI Content Generator',
        category: 'AI/ML',
        description: 'GPT-powered content creation tool with real-time collaboration features.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        tags: ['Python', 'OpenAI', 'React', 'FastAPI'],
        link: '#',
        github: '#'
    }
]

const Projects = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [selectedProject, setSelectedProject] = useState(null)

    return (
        <section id='projects' className='section-padding relative'>
            <div className='container-custom'>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className='text-center mb-16'
                >
                    <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>Portfolio</p>
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        Featured <span className='gradient-text'>Projects</span>
                    </h2>
                </motion.div>

                <div className='grid md:grid-cols-2 gap-8'>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            className='group glass-card overflow-hidden cursor-pointer'
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ y: -10 }}
                        >
                            <div className='relative h-64 overflow-hidden'>
                                <img src={project.image} alt={project.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
                                <div className='absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent' />
                            </div>
                            <div className='p-6'>
                                <p className='text-accent-primary text-sm mb-2'>{project.category}</p>
                                <h3 className='text-xl font-bold text-white mb-2'>{project.title}</h3>
                                <p className='text-white/60 text-sm mb-4'>{project.description}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {project.tags.map(tag => (
                                        <span key={tag} className='text-xs px-3 py-1 bg-white/10 rounded-full text-white/60'>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-sm'
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className='glass-card max-w-2xl w-full max-h-[90vh] overflow-auto'
                            onClick={e => e.stopPropagation()}
                        >
                            <div className='relative'>
                                <img src={selectedProject.image} alt={selectedProject.title} className='w-full h-64 object-cover' />
                                <button onClick={() => setSelectedProject(null)} className='absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-950/50 flex items-center justify-center text-white hover:bg-dark-950'>
                                    <HiX className='w-5 h-5' />
                                </button>
                            </div>
                            <div className='p-8'>
                                <p className='text-accent-primary text-sm mb-2'>{selectedProject.category}</p>
                                <h3 className='text-2xl font-bold text-white mb-4'>{selectedProject.title}</h3>
                                <p className='text-white/60 mb-6'>{selectedProject.description}</p>
                                <div className='flex flex-wrap gap-2 mb-6'>
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className='text-sm px-4 py-2 bg-white/10 rounded-full text-white/60'>{tag}</span>
                                    ))}
                                </div>
                                <div className='flex gap-4'>
                                    <a href={selectedProject.link} className='btn-primary flex items-center gap-2'>
                                        <HiExternalLink /> Live Demo
                                    </a>
                                    <a href={selectedProject.github} className='btn-outline flex items-center gap-2'>
                                        <HiCode /> Source Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Projects
