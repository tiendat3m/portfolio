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
        <>
            <section id="blog" className="section-padding relative">
                <div className="container-custom">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-center mb-16"
                    >
                        <p className="text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4">
                            Blog
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-white mb-4">
                            Latest <span className="gradient-text">Articles</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Thoughts on web development, design, and creative technology.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {previewPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className="premium-card overflow-hidden rounded-3xl group cursor-pointer"
                            >
                                <div className="relative h-44 overflow-hidden rounded-t-3xl">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-accent-primary/90 text-white text-xs font-medium rounded-full">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10 p-6">
                                    <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
                                        <span className="flex items-center gap-1">
                                            <HiCalendar className="w-4 h-4" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HiClock className="w-4 h-4" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold tracking-[-0.03em] text-white mb-3 line-clamp-2 group-hover:text-accent-primary transition-colors">
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="hover:text-accent-primary transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-white/60 text-sm leading-6 mb-5 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="flex items-center gap-2 text-accent-primary text-sm font-medium group-hover:gap-3 transition-all"
                                    >
                                        Read More <HiArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-12"
                    >
                        <Link to="/blog" className="btn-outline">
                            View All Articles
                        </Link>
                    </motion.div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent-tertiary/10 rounded-full blur-[120px]" />
            </section>
        </>
    )
}

export default Blog
