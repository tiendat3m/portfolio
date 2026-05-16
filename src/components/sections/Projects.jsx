import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCode, HiX } from 'react-icons/hi'

const projects = [
    {
        id: 1,
        title: 'Todo List App',
        category: 'Personal Project',
        description: 'Task management app with clean UI and practical daily workflow. Built as a public project with full source code and live demo.',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
        tags: ['React', 'Vite', 'JavaScript', 'CSS'],
        link: 'https://todo-list-rouge-six-63.vercel.app/',
        github: 'https://github.com/tiendat3m/TodoList'
    },
    {
        id: 2,
        title: 'D-Movie',
        category: 'Personal Project',
        description: 'Movie browsing web app with modern interface and smooth UX. Publicly available with full source code and live deployment.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        tags: ['React', 'Vite', 'REST API', 'Tailwind CSS'],
        link: 'https://d-movie.vercel.app/',
        github: 'https://github.com/tiendat3m/d-movie'
    },
    {
        id: 3,
        title: 'Dongten',
        category: 'Company Project',
        description: 'Contributed to product development for dongten.net. Stack includes Angular (frontend), NestJS (backend), and Laravel (admin). Source code is private.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
        tags: ['Angular', 'NestJS', 'Laravel Admin', 'Enterprise'],
        link: 'https://dongten.net/',
        github: null
    },
    {
        id: 4,
        title: 'Eskimo Travel (VN)',
        category: 'Company Project',
        description: 'Built and maintained admin features for eskimo.travel/vn, focusing on operational workflows, data management, and content control. Source code is private.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        tags: ['Admin Panel', 'Dashboard', 'Operations', 'Private Source'],
        link: 'https://www.eskimo.travel/vn',
        github: null
    },
    {
        id: 5,
        title: 'Ganbaru Method',
        category: 'Company Project',
        description: 'Implemented and supported admin-side modules for ganbarumethod.com, including management screens and internal tools. Source code is private.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        tags: ['Admin Panel', 'Internal Tools', 'CMS Workflow', 'Private Source'],
        link: 'https://ganbarumethod.com/',
        github: null
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
                                <div className='flex gap-4 flex-wrap'>
                                    <a href={selectedProject.link} target='_blank' rel='noreferrer' className='btn-primary flex items-center gap-2'>
                                        <HiExternalLink /> Live Demo
                                    </a>
                                    {selectedProject.github ? (
                                        <a href={selectedProject.github} target='_blank' rel='noreferrer' className='btn-outline flex items-center gap-2'>
                                            <HiCode /> Source Code
                                        </a>
                                    ) : (
                                        <span className='btn-outline opacity-60 cursor-not-allowed inline-flex items-center gap-2'>
                                            <HiCode /> Private Source
                                        </span>
                                    )}
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
