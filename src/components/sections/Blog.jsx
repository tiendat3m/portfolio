import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCalendar, HiClock, HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const defaultPosts = [
    {
        id: 1,
        title: 'Building Immersive 3D Web Experiences with Three.js',
        excerpt: 'Learn how to create stunning 3D visualizations for the web using Three.js and React Three Fiber.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        category: 'Development',
        date: 'Mar 15, 2026',
        readTime: '8 min read',
        author: 'Admin',
        content: `Three.js has revolutionized the way we think about web experiences. In this comprehensive guide, we will explore how to integrate Three.js with React using React Three Fiber, creating stunning 3D visualizations that captivate users and elevate your web projects to new heights.

## Getting Started with Three.js

Three.js is a powerful JavaScript library that makes WebGL accessible to everyone. It provides a high-level API for creating and displaying 3D graphics in the browser without having to deal with the complexities of raw WebGL.

## Conclusion

Three.js and React Three Fiber open up incredible possibilities for web development.`
    },
    {
        id: 2,
        title: 'The Future of Web Animation: Framer Motion vs GSAP',
        excerpt: 'A deep dive comparison of two popular animation libraries and when to use each one.',
        image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800',
        category: 'Animation',
        date: 'Mar 10, 2026',
        readTime: '6 min read',
        author: 'Admin',
        content: `Animation libraries have become essential tools for modern web development. Framer Motion and GSAP are two of the most popular choices.

## Conclusion

Both libraries are excellent choices. The best one depends on your specific needs.`
    },
    {
        id: 3,
        title: 'Mastering Tailwind CSS: Advanced Techniques',
        excerpt: 'Take your Tailwind CSS skills to the next level with these advanced tips and tricks.',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
        category: 'CSS',
        date: 'Mar 5, 2026',
        readTime: '10 min read',
        author: 'Admin',
        content: `Tailwind CSS has transformed how developers approach styling.

## Conclusion

With advanced techniques, you can build sophisticated, maintainable design systems.`
    }
]

const Blog = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('blogPosts')
        return saved ? JSON.parse(saved) : defaultPosts
    })

    // Listen for localStorage changes from BlogPage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'blogPosts' && e.newValue) {
                setPosts(JSON.parse(e.newValue))
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    // Only show first 3 posts on homepage
    const previewPosts = posts.slice(0, 3)

    return (
        <>
            <section id='blog' className='section-padding relative'>
                <div className='container-custom'>
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className='text-center mb-16'
                    >
                        <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>
                            Blog
                        </p>
                        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                            Latest <span className='gradient-text'>Articles</span>
                        </h2>
                        <p className='text-white/60 max-w-2xl mx-auto'>
                            Thoughts on web development, design, and creative technology.
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {previewPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className='glass-card overflow-hidden group cursor-pointer'
                                whileHover={{ y: -10 }}
                            >
                                <Link to='/blog'>
                                    <div className='relative h-48 overflow-hidden'>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                        />
                                        <div className='absolute top-4 left-4'>
                                            <span className='px-3 py-1 bg-accent-primary/90 text-white text-xs font-medium rounded-full'>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='p-6'>
                                        <div className='flex items-center gap-4 text-white/50 text-sm mb-3'>
                                            <span className='flex items-center gap-1'>
                                                <HiCalendar className='w-4 h-4' />
                                                {post.date}
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <HiClock className='w-4 h-4' />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h3 className='text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-primary transition-colors'>
                                            {post.title}
                                        </h3>

                                        <p className='text-white/60 text-sm mb-4 line-clamp-2'>
                                            {post.excerpt}
                                        </p>

                                        <span className='flex items-center gap-2 text-accent-primary text-sm font-medium group-hover:gap-3 transition-all'>
                                            Read More <HiArrowRight className='w-4 h-4' />
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className='text-center mt-12'
                    >
                        <Link to='/blog' className='btn-outline'>
                            View All Articles
                        </Link>
                    </motion.div>
                </div>

                {/* Background decoration */}
                <div className='absolute top-1/3 left-0 w-80 h-80 bg-accent-tertiary/10 rounded-full blur-[120px]' />
            </section>
        </>
    )
}

export default Blog