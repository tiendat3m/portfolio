import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiCalendar, HiClock, HiArrowRight, HiCog, HiHome, HiLogout, HiLogin, HiUser } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import BlogPost from '../components/sections/BlogPost'
import BlogAdmin from '../components/admin/BlogAdmin'
import LoginModal from '../components/ui/LoginModal'
import ThemeToggle from '../components/ui/ThemeToggle'
import ScrollToTop from '../components/ui/ScrollToTop'
import Search from '../components/ui/Search'
import { getPosts, createPost, updatePost, deletePost, subscribeToPosts, unsubscribe } from '../services/supabaseService'

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

When combined with React through React Three Fiber, you get a declarative way to build 3D scenes using familiar React patterns. This means you can use components, hooks, and the entire React ecosystem while working with 3D graphics.

## Setting Up Your Environment

First, install the necessary dependencies:

npm install three @react-three/fiber @react-three/drei

The @react-three/drei package provides helpful abstractions for common Three.js patterns, making it easier to add lights, cameras, controls, and more.

## Creating Your First 3D Scene

A basic Three.js scene in React uses a Canvas component as the container. Inside, you can add meshes, lights, and controls to create your 3D environment.

## Performance Optimization Tips

When working with 3D on the web, performance is crucial:

1. Use instancing for repeated geometries
2. Implement level of detail (LOD) for complex models
3. Optimize textures - use compressed formats when possible
4. Lazy load 3D components when they enter the viewport
5. Use useMemo for expensive calculations

## Conclusion

Three.js and React Three Fiber open up incredible possibilities for web development. By combining the power of 3D graphics with React's component model, you can create truly immersive experiences that stand out from the crowd.`
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
        content: `Animation libraries have become essential tools for modern web development. Framer Motion and GSAP are two of the most popular choices, each with its own strengths and use cases.

## Framer Motion: The React Way

Framer Motion is built specifically for React. It provides a declarative API that feels natural in React applications.

Best for:
- UI component animations
- Page transitions
- Gesture-based interactions
- Layout animations
- React-specific features

## GSAP: The Animation Powerhouse

GSAP (GreenSock Animation Platform) is framework-agnostic and incredibly powerful.

Best for:
- Complex timeline animations
- Scroll-triggered animations
- SVG animations
- Performance-critical animations
- Framework-agnostic projects

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
        content: `Tailwind CSS has transformed how developers approach styling. Beyond the basics, there are powerful techniques that can help you build more maintainable and efficient stylesheets.

## Custom Design Tokens

While Tailwind provides excellent defaults, customizing your design tokens makes your project unique.

## @apply for Component Classes

The @apply directive lets you compose utility classes into reusable component classes.

## Custom Plugins

Extend Tailwind with custom plugins for repetitive patterns.

## Conclusion

With advanced techniques, you can build sophisticated, maintainable design systems.`
    }
]

const BlogPage = () => {
    const { isAuthenticated, isAdmin, isGuest, user, logout, setShowLoginModal } = useAuth()
    const [selectedPost, setSelectedPost] = useState(null)
    const [isAdminOpen, setIsAdminOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('blogPosts')
        return saved ? JSON.parse(saved) : defaultPosts
    })
    const [isLoading, setIsLoading] = useState(false)
    const [useSupabase, setUseSupabase] = useState(false)

    // Check if Supabase is configured
    useEffect(() => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
        if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL') {
            setUseSupabase(true)
            loadPostsFromSupabase()
        }
    }, [])

    // Load posts from Supabase
    const loadPostsFromSupabase = async () => {
        setIsLoading(true)
        const { data, error } = await getPosts()
        if (data && !error) {
            setPosts(data)
        }
        setIsLoading(false)
    }

    // Real-time subscription for Supabase
    useEffect(() => {
        if (!useSupabase) return

        const channel = subscribeToPosts((payload) => {
            console.log('Real-time update:', payload)
            if (payload.eventType === 'INSERT') {
                setPosts(prev => [payload.new, ...prev])
            } else if (payload.eventType === 'UPDATE') {
                setPosts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p))
            } else if (payload.eventType === 'DELETE') {
                setPosts(prev => prev.filter(p => p.id !== payload.old.id))
            }
        })

        return () => {
            if (channel) {
                unsubscribe(channel)
            }
        }
    }, [useSupabase])

    // Save to localStorage whenever posts change (fallback)
    useEffect(() => {
        if (!useSupabase) {
            localStorage.setItem('blogPosts', JSON.stringify(posts))
        }
    }, [posts, useSupabase])

    const handleSavePost = async (post) => {
        if (useSupabase) {
            const existingIndex = posts.findIndex(p => p.id === post.id)
            if (existingIndex >= 0) {
                // Update existing post - remove date field and convert readTime to read_time
                const { date, readTime, ...postData } = post
                const updateData = {
                    ...postData,
                    read_time: readTime
                }
                const { data, error } = await updatePost(post.id, updateData)
                if (data && !error) {
                    setPosts(prev => prev.map(p => p.id === post.id ? data : p))
                }
            } else {
                // Create new post - remove date, id fields and convert readTime to read_time
                const { date, id, readTime, ...postData } = post
                const newPost = {
                    ...postData,
                    read_time: readTime,
                    author: user?.username || 'Admin'
                }
                const { data, error } = await createPost(newPost)
                if (data && !error) {
                    setPosts(prev => [data, ...prev])
                }
            }
        } else {
            // Fallback to localStorage
            setPosts(prev => {
                const existingIndex = prev.findIndex(p => p.id === post.id)
                if (existingIndex >= 0) {
                    const updated = [...prev]
                    updated[existingIndex] = { ...post, updatedAt: new Date().toISOString() }
                    return updated
                } else {
                    const newPost = {
                        ...post,
                        author: user?.username || 'Admin',
                        createdAt: new Date().toISOString()
                    }
                    return [newPost, ...prev]
                }
            })
        }
    }

    const handleDeletePost = async (postId) => {
        if (useSupabase) {
            const { error } = await deletePost(postId)
            if (!error) {
                setPosts(prev => prev.filter(p => p.id !== postId))
            }
        } else {
            setPosts(prev => prev.filter(p => p.id !== postId))
        }
    }

    const handlePostClick = (post) => {
        setSelectedPost(post)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSearchSelect = (post) => {
        setSelectedPost(post)
    }

    const categories = ['All', ...new Set(posts.map(p => p.category))]
    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(p => p.category === selectedCategory)

    // Show full blog post if selected
    if (selectedPost) {
        return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
    }

    return (
        <>
            <Navbar />

            <div className='min-h-screen bg-dark-950 pt-24 relative'>
                <ThemeToggle />

                {/* Header */}
                <div className='container-custom py-12'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mb-12'
                    >
                        <Link
                            to='/'
                            className='inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors'
                        >
                            <HiHome className='w-5 h-5' />
                            Back to Portfolio
                        </Link>

                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                            <div>
                                <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>
                                    Blog
                                </p>
                                <h1 className='text-4xl md:text-5xl font-bold text-white'>
                                    Latest <span className='gradient-text'>Articles</span>
                                </h1>
                                <p className='text-white/60 mt-4 max-w-xl'>
                                    Thoughts on web development, design, and creative technology.
                                    Sharing insights from building digital experiences.
                                </p>
                                {/* {useSupabase && (
                                    <p className='text-green-400 text-sm mt-2 flex items-center gap-2'>
                                        <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                                        Connected to Supabase
                                    </p>
                                )} */}
                            </div>

                            <div className='flex items-center gap-4'>
                                {/* Search */}
                                <Search posts={posts} onSelectPost={handleSearchSelect} />

                                {/* User Info */}
                                {isAuthenticated && (
                                    <div className='flex items-center gap-3 px-4 py-2 bg-dark-800/50 rounded-lg border border-white/10'>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAdmin ? 'bg-gradient-to-r from-accent-primary to-accent-secondary' : 'bg-white/10'
                                            }`}>
                                            <HiUser className='w-4 h-4 text-white' />
                                        </div>
                                        <div>
                                            <p className='text-white text-sm font-medium'>{user?.username}</p>
                                            <p className={`text-xs ${isAdmin ? 'text-accent-primary' : 'text-white/50'}`}>
                                                {isAdmin ? 'Admin' : 'Guest'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className='ml-2 p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors'
                                            title='Logout'
                                        >
                                            <HiLogout className='w-4 h-4' />
                                        </button>
                                    </div>
                                )}

                                {/* Login Button */}
                                {!isAuthenticated && (
                                    <motion.button
                                        onClick={() => setShowLoginModal(true)}
                                        className='btn-outline flex items-center gap-2'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <HiLogin className='w-5 h-5' />
                                        Login
                                    </motion.button>
                                )}

                                {/* Admin Button */}
                                {isAdmin && (
                                    <motion.button
                                        onClick={() => setIsAdminOpen(true)}
                                        className='btn-primary flex items-center gap-2'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <HiCog className='w-5 h-5' />
                                        Admin Panel
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Permission Notice */}
                    {!isAuthenticated && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='mb-8 p-4 glass-card border-l-4 border-accent-primary'
                        >
                            <p className='text-white/80'>
                                <span className='text-accent-primary font-medium'>Welcome!</span> Login to create and manage your own blog posts.
                            </p>
                        </motion.div>
                    )}

                    {isGuest && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='mb-8 p-4 glass-card border-l-4 border-accent-secondary'
                        >
                            <p className='text-white/80'>
                                <span className='text-accent-secondary font-medium'>Hello {user?.username}!</span> You're browsing as a guest. Only admins can create or edit posts.
                            </p>
                        </motion.div>
                    )}

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='flex flex-wrap gap-3 mb-12'
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-accent-primary text-white'
                                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className='text-center py-16'>
                            <div className='w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4' />
                            <p className='text-white/60'>Loading posts...</p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!isLoading && (
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className='glass-card overflow-hidden group cursor-pointer'
                                    onClick={() => handlePostClick(post)}
                                    whileHover={{ y: -10 }}
                                >
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
                                                {post.date || new Date(post.created_at).toLocaleDateString()}
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

                                        <div className='flex items-center justify-between'>
                                            <span className='flex items-center gap-2 text-accent-primary text-sm font-medium group-hover:gap-3 transition-all'>
                                                Read More <HiArrowRight className='w-4 h-4' />
                                            </span>
                                            {post.author && (
                                                <span className='text-white/40 text-xs'>
                                                    by {post.author}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredPosts.length === 0 && (
                        <div className='text-center py-16'>
                            <p className='text-white/40 text-lg'>No posts found in this category</p>
                        </div>
                    )}

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-6'
                    >
                        {[
                            { value: posts.length, label: 'Articles Published' },
                            { value: categories.length - 1, label: 'Categories' },
                            { value: '10K+', label: 'Monthly Readers' },
                            { value: '50+', label: 'Comments' }
                        ].map((stat, index) => (
                            <div key={index} className='glass-card p-6 text-center'>
                                <span className='text-3xl font-bold gradient-text block mb-2'>
                                    {stat.value}
                                </span>
                                <span className='text-white/60 text-sm'>{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Background decorations */}
                <div className='absolute top-1/4 left-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[150px]' />
                <div className='absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[150px]' />

                {/* Login Modal */}
                <LoginModal />

                {/* Admin Panel */}
                {isAdminOpen && isAdmin && (
                    <BlogAdmin
                        posts={posts}
                        onSave={handleSavePost}
                        onDelete={handleDeletePost}
                        onClose={() => setIsAdminOpen(false)}
                    />
                )}
            </div>

            <Footer />
            <ScrollToTop />
        </>
    )
}

export default BlogPage