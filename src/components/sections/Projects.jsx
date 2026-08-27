import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCode, HiX } from 'react-icons/hi'

const projects = [
    {
        id: 1,
        title: 'Todo List App',
        category: 'Personal Project',
        description:
            'A task management app designed around simple daily workflows, with clean UI structure, responsive layout, and a public codebase to demonstrate frontend fundamentals clearly.',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
        tags: ['React', 'Vite', 'JavaScript', 'CSS'],
        link: 'https://todo-list-rouge-six-63.vercel.app/',
        github: 'https://github.com/tiendat3m/TodoList'
    },
    {
        id: 2,
        title: 'D-Movie',
        category: 'Personal Project',
        description:
            'A movie discovery web app focused on polished browsing experience, API-driven content rendering, and a modern responsive interface with public source code and live demo.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        tags: ['React', 'Vite', 'REST API', 'Tailwind CSS'],
        link: 'https://d-movie.vercel.app/',
        github: 'https://github.com/tiendat3m/d-movie'
    },
    {
        id: 3,
        title: 'Dongten',
        category: 'Company Project',
        description:
            'Worked across the main product and admin system for dongten.net, handling full frontend implementation with Angular, backend tasks with NestJS, and admin-side development with Laravel in a private commercial codebase.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
        tags: ['Angular Frontend', 'NestJS Backend', 'Laravel Admin', 'Enterprise'],
        link: 'https://dongten.net/',
        github: null
    },
    {
        id: 4,
        title: 'Eskimo Travel (VN)',
        category: 'Company Project',
        description:
            'Built and maintained admin frontend screens for operational workflows, data management, and content control, focusing on practical internal tools that support daily business operations.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        tags: ['Admin Frontend', 'Dashboard UI', 'Operations', 'Private Source'],
        link: 'https://www.eskimo.travel/vn',
        github: null
    },
    {
        id: 5,
        title: 'Ganbaru Method',
        category: 'Company Project',
        description:
            'Implemented and supported admin frontend modules for management workflows and internal business screens, with emphasis on usability, clarity, and maintainable UI structure.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        tags: ['Admin Frontend', 'Internal Tools', 'Management Screens', 'Private Source'],
        link: 'https://ganbarumethod.com/',
        github: null
    }
]

const Projects = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [selectedProject, setSelectedProject] = useState(null)

    return (
        <section id="projects" className="terminal-section section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">ls projects/</p>
                    <h2 className="terminal-heading text-3xl md:text-5xl">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-terminal-text/80">
                        Selected personal and company work focused on practical UI, admin workflows,
                        and production web delivery.
                    </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.08 }}
                            className="premium-card terminal-row-link group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="grid md:grid-cols-[11rem_1fr]">
                                <div className="relative h-48 overflow-hidden border-b border-terminal-border md:h-auto md:border-b-0 md:border-r">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-terminal-green/10 mix-blend-screen" />
                                </div>
                                <div className="relative z-10 p-5">
                                    <p className="mb-3 text-xs uppercase text-terminal-accent">
                                        drwxr-xr-x {project.category}
                                    </p>
                                    <h3 className="terminal-underline mb-3 text-2xl font-medium text-terminal-green">
                                        {project.title}
                                    </h3>
                                    <p className="mb-5 text-sm leading-6 text-terminal-text/80">
                                        <span className="text-terminal-muted">{'// '}</span>
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="border border-terminal-border bg-terminal-bg px-3 py-1 text-xs text-terminal-text/70"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-terminal-bg/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            className="glass-card max-h-[90vh] w-full max-w-2xl overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-64 w-full object-cover grayscale"
                                />
                                <div className="absolute inset-0 bg-terminal-green/10 mix-blend-screen" />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-bg text-terminal-green hover:text-terminal-accent"
                                    aria-label="Close project details"
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="relative z-10 p-6 sm:p-8">
                                <p className="terminal-command mb-2">cat project.md</p>
                                <p className="mb-2 text-sm text-terminal-accent">
                                    {selectedProject.category}
                                </p>
                                <h3 className="mb-4 text-2xl font-medium text-terminal-green">
                                    {selectedProject.title}
                                </h3>
                                <p className="mb-6 text-terminal-text/80">
                                    {selectedProject.description}
                                </p>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-terminal-border bg-terminal-bg px-3 py-1 text-sm text-terminal-text/70"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        <HiExternalLink /> Live Demo
                                    </a>
                                    {selectedProject.github ? (
                                        <a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-outline flex items-center gap-2"
                                        >
                                            <HiCode /> Source Code
                                        </a>
                                    ) : (
                                        <span className="btn-outline inline-flex cursor-not-allowed items-center gap-2 opacity-60">
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
