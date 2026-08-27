import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
    HiCalendar,
    HiClock,
    HiArrowRight,
    HiCog,
    HiHome,
    HiLogout,
    HiLogin,
    HiUser
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getStoredBlogPosts } from '../data/defaultPosts'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ThemeToggle from '../components/ui/ThemeToggle'
import ScrollToTop from '../components/ui/ScrollToTop'
import Search from '../components/ui/Search'
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    subscribeToPosts,
    unsubscribe
} from '../services/supabaseService'

const BlogPost = lazy(() => import('../components/sections/BlogPost'))
const BlogAdmin = lazy(() => import('../components/admin/BlogAdmin'))
const LoginModal = lazy(() => import('../components/ui/LoginModal'))

const BlogPage = () => {
    const { isAuthenticated, isAdmin, isGuest, user, logout, setShowLoginModal } = useAuth()
    const [selectedPost, setSelectedPost] = useState(null)
    const [isAdminOpen, setIsAdminOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [posts, setPosts] = useState(getStoredBlogPosts)
    const [isLoading, setIsLoading] = useState(false)
    const [useSupabase, setUseSupabase] = useState(false)

    // Load posts from Supabase
    const loadPostsFromSupabase = async () => {
        setIsLoading(true)
        const { data, error } = await getPosts()
        if (data && !error) {
            setPosts(data)
        }
        setIsLoading(false)
    }

    // Check if Supabase is configured
    useEffect(() => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
        if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL') {
            setUseSupabase(true)
            loadPostsFromSupabase()
        }
    }, [])

    // Real-time subscription for Supabase
    useEffect(() => {
        if (!useSupabase) return

        const channel = subscribeToPosts((payload) => {
            if (payload.eventType === 'INSERT') {
                setPosts((prev) => [payload.new, ...prev])
            } else if (payload.eventType === 'UPDATE') {
                setPosts((prev) => prev.map((p) => (p.id === payload.new.id ? payload.new : p)))
            } else if (payload.eventType === 'DELETE') {
                setPosts((prev) => prev.filter((p) => p.id !== payload.old.id))
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
            const existingIndex = posts.findIndex((p) => p.id === post.id)
            if (existingIndex >= 0) {
                // Update existing post - remove date field and convert readTime to read_time
                const { readTime, ...postData } = post
                delete postData.date
                const updateData = {
                    ...postData,
                    read_time: readTime
                }
                const { data, error } = await updatePost(post.id, updateData)
                if (data && !error) {
                    setPosts((prev) => prev.map((p) => (p.id === post.id ? data : p)))
                }
            } else {
                // Create new post - remove date, id fields and convert readTime to read_time
                const { readTime, ...postData } = post
                delete postData.date
                delete postData.id
                const newPost = {
                    ...postData,
                    read_time: readTime,
                    author: user?.username || 'Admin'
                }
                const { data, error } = await createPost(newPost)
                if (data && !error) {
                    setPosts((prev) => [data, ...prev])
                }
            }
        } else {
            // Fallback to localStorage
            setPosts((prev) => {
                const existingIndex = prev.findIndex((p) => p.id === post.id)
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
                setPosts((prev) => prev.filter((p) => p.id !== postId))
            }
        } else {
            setPosts((prev) => prev.filter((p) => p.id !== postId))
        }
    }

    const handlePostClick = (post) => {
        setSelectedPost(post)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSearchSelect = (post) => {
        setSelectedPost(post)
    }

    const categories = useMemo(() => ['All', ...new Set(posts.map((p) => p.category))], [posts])

    const filteredPosts = useMemo(
        () =>
            selectedCategory === 'All'
                ? posts
                : posts.filter((p) => p.category === selectedCategory),
        [posts, selectedCategory]
    )

    const totalComments = useMemo(
        () =>
            posts.reduce((sum, post) => {
                if (typeof post.comments_count === 'number') return sum + post.comments_count
                if (Array.isArray(post.comments)) return sum + post.comments.length
                return sum
            }, 0),
        [posts]
    )

    const monthlyReaders = useMemo(
        () =>
            posts.reduce((sum, post) => {
                const readers = Number(post.monthly_readers)
                return Number.isFinite(readers) ? sum + readers : sum
            }, 0),
        [posts]
    )

    // Show full blog post if selected
    if (selectedPost) {
        return (
            <Suspense fallback={<div className="min-h-screen bg-dark-950" />}>
                <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
            </Suspense>
        )
    }

    return (
        <div className="relative min-h-screen bg-terminal-bg px-0 py-0 sm:px-2 sm:py-2">
            <div className="terminal-window">
                <div className="terminal-titlebar" aria-hidden="true">
                    <div className="flex items-center gap-2">
                        <span className="terminal-dot bg-red-500" />
                        <span className="terminal-dot bg-yellow-400" />
                        <span className="terminal-dot bg-green-400" />
                    </div>
                    <span className="truncate text-xs text-terminal-text sm:text-sm">
                        user@portfolio: ~/blog$
                    </span>
                    <span className="terminal-cursor ml-auto hidden sm:inline-block">_</span>
                </div>

                <Navbar />

                <div className="min-h-screen bg-terminal-bg pt-6 relative">
                    <ThemeToggle />

                    {/* Header */}
                    <div className="container-custom py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <Link
                                to="/"
                                className="mb-8 inline-flex items-center gap-2 text-terminal-text/70 transition-colors hover:text-terminal-accent"
                            >
                                <HiHome className="w-5 h-5" />
                                Back to Portfolio
                            </Link>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <p className="terminal-command mb-4">ls blog/ --sort=time</p>
                                    <h1 className="terminal-heading text-4xl md:text-5xl">
                                        Latest <span className="gradient-text">Articles</span>
                                    </h1>
                                    <p className="mt-4 max-w-xl text-terminal-text/80">
                                        Thoughts on web development, design, and creative
                                        technology. Sharing insights from building digital
                                        experiences.
                                    </p>
                                    {/* {useSupabase && (
                                    <p className='text-green-400 text-sm mt-2 flex items-center gap-2'>
                                        <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                                        Connected to Supabase
                                    </p>
                                )} */}
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Search */}
                                    <Search posts={posts} onSelectPost={handleSearchSelect} />

                                    {/* User Info */}
                                    {isAuthenticated && (
                                        <div className="flex items-center gap-3 border border-terminal-border bg-terminal-surface px-4 py-2">
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center border border-terminal-border ${
                                                    isAdmin
                                                        ? 'bg-terminal-accent text-terminal-bg'
                                                        : 'bg-terminal-bg text-terminal-green'
                                                }`}
                                            >
                                                <HiUser className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-terminal-green text-sm font-medium">
                                                    {user?.username}
                                                </p>
                                                <p
                                                    className={`text-xs ${isAdmin ? 'text-terminal-accent' : 'text-terminal-muted'}`}
                                                >
                                                    {isAdmin ? 'Admin' : 'Guest'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={logout}
                                                className="ml-2 border border-transparent p-1.5 text-terminal-muted transition-colors hover:border-terminal-border hover:text-terminal-accent"
                                                title="Logout"
                                            >
                                                <HiLogout className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Login Button */}
                                    {!isAuthenticated && (
                                        <motion.button
                                            onClick={() => setShowLoginModal(true)}
                                            className="btn-outline flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <HiLogin className="w-5 h-5" />
                                            Login
                                        </motion.button>
                                    )}

                                    {/* Admin Button */}
                                    {isAdmin && (
                                        <motion.button
                                            onClick={() => setIsAdminOpen(true)}
                                            className="btn-primary flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <HiCog className="w-5 h-5" />
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
                                className="glass-card mb-8 border-l-4 border-terminal-accent p-4"
                            >
                                <p className="text-terminal-text/80">
                                    <span className="font-medium text-terminal-accent">
                                        Welcome!
                                    </span>{' '}
                                    Login to create and manage your own blog posts.
                                </p>
                            </motion.div>
                        )}

                        {isGuest && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass-card mb-8 border-l-4 border-terminal-accent p-4"
                            >
                                <p className="text-terminal-text/80">
                                    <span className="font-medium text-terminal-accent">
                                        Hello {user?.username}!
                                    </span>{' '}
                                    You're browsing as a guest. Only admins can create or edit
                                    posts.
                                </p>
                            </motion.div>
                        )}

                        {/* Category Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-3 mb-12"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`border px-4 py-2 text-sm font-medium transition-all ${
                                        selectedCategory === category
                                            ? 'border-terminal-accent bg-terminal-accent/10 text-terminal-accent'
                                            : 'border-terminal-border bg-terminal-surface text-terminal-text/70 hover:border-terminal-accent hover:text-terminal-accent'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="text-center py-16">
                                <div className="mx-auto mb-4 h-8 w-8 animate-spin border-2 border-terminal-border border-t-terminal-accent" />
                                <p className="text-terminal-muted">Loading posts...</p>
                            </div>
                        )}

                        {/* Blog Grid */}
                        {!isLoading && (
                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {filteredPosts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card terminal-row-link group cursor-pointer overflow-hidden"
                                        onClick={() => handlePostClick(post)}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div className="relative h-48 overflow-hidden border-b border-terminal-border">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="border border-terminal-accent bg-terminal-bg/90 px-3 py-1 text-xs font-medium text-terminal-accent">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center gap-4 text-terminal-muted text-sm mb-3">
                                                <span className="flex items-center gap-1">
                                                    <HiCalendar className="w-4 h-4" />
                                                    {post.date ||
                                                        new Date(
                                                            post.created_at
                                                        ).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <HiClock className="w-4 h-4" />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            <h3 className="terminal-underline text-lg font-medium text-terminal-green mb-3 line-clamp-2 group-hover:text-terminal-accent transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-terminal-text/75 text-sm mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-terminal-accent text-sm font-medium group-hover:gap-3 transition-all">
                                                    Read More <HiArrowRight className="w-4 h-4" />
                                                </span>
                                                {post.author && (
                                                    <span className="text-terminal-muted text-xs">
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
                            <div className="text-center py-16">
                                <p className="text-terminal-muted text-lg">
                                    No posts found in this category
                                </p>
                            </div>
                        )}

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
                        >
                            {[
                                { value: posts.length, label: 'Articles Published' },
                                { value: categories.length - 1, label: 'Categories' },
                                { value: monthlyReaders, label: 'Monthly Readers' },
                                { value: totalComments, label: 'Comments' }
                            ].map((stat, index) => (
                                <div key={index} className="glass-card p-6 text-center">
                                    <span className="mb-2 block text-3xl font-medium text-terminal-accent">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-terminal-text/70">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Login Modal */}
                    <Suspense fallback={null}>
                        <LoginModal />
                    </Suspense>

                    {/* Admin Panel */}
                    {isAdminOpen && isAdmin && (
                        <Suspense fallback={null}>
                            <BlogAdmin
                                posts={posts}
                                onSave={handleSavePost}
                                onDelete={handleDeletePost}
                                onClose={() => setIsAdminOpen(false)}
                            />
                        </Suspense>
                    )}
                </div>

                <Footer />
            </div>
            <ScrollToTop />
        </div>
    )
}

export default BlogPage
