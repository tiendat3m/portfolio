import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCalendar, HiClock, HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getStoredBlogPosts } from '../../data/defaultPosts'

const Blog = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [posts, setPosts] = useState(getStoredBlogPosts)

    // Listen for localStorage changes from BlogPage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'blogPosts' && e.newValue) {
                try {
                    setPosts(JSON.parse(e.newValue))
                } catch {
                    setPosts(getStoredBlogPosts())
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    // Only show first 3 posts on homepage
    const previewPosts = posts.slice(0, 3)

    return (
        <section id="blog" className="terminal-section section-padding relative">
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-14"
                >
                    <span className="terminal-loading">Loading...</span>
                    <p className="terminal-command mb-4">ls blog/ --sort=time</p>
                    <h2 className="terminal-heading mb-4 text-3xl md:text-5xl">
                        Latest <span className="gradient-text">Articles</span>
                    </h2>
                    <p className="max-w-2xl text-terminal-text/80">
                        Thoughts on web development, design, and creative technology.
                    </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {previewPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            className="premium-card terminal-row-link group cursor-pointer overflow-hidden"
                        >
                            <div className="relative h-44 overflow-hidden border-b border-terminal-border">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="border border-terminal-accent bg-terminal-bg/90 px-3 py-1 text-xs font-medium text-terminal-accent">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 p-5">
                                <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-terminal-muted">
                                    <span className="flex items-center gap-1">
                                        <HiCalendar className="h-4 w-4" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <HiClock className="h-4 w-4" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="terminal-underline mb-3 line-clamp-2 text-xl font-medium text-terminal-green transition-colors group-hover:text-terminal-accent">
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="transition-colors hover:text-terminal-accent"
                                    >
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="mb-5 line-clamp-2 text-sm leading-6 text-terminal-text/75">
                                    <span className="text-terminal-muted">{'// '}</span>
                                    {post.excerpt}
                                </p>

                                <Link
                                    to={`/blog/${post.id}`}
                                    className="flex items-center gap-2 text-sm font-medium text-terminal-accent transition-all group-hover:gap-3"
                                >
                                    Read More <HiArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <Link to="/blog" className="btn-outline">
                        View All Articles
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default Blog
