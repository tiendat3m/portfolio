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
        <>
            <Navbar />

            <div className="min-h-screen bg-dark-950 pt-24 relative">
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
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
                        >
                            <HiHome className="w-5 h-5" />
                            Back to Portfolio
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <p className="text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4">
                                    Blog
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold text-white">
                                    Latest <span className="gradient-text">Articles</span>
                                </h1>
                                <p className="text-white/60 mt-4 max-w-xl">
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

                            <div className="flex items-center gap-4">
                                {/* Search */}
                                <Search posts={posts} onSelectPost={handleSearchSelect} />

                                {/* User Info */}
                                {isAuthenticated && (
                                    <div className="flex items-center gap-3 px-4 py-2 bg-dark-800/50 rounded-lg border border-white/10">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                isAdmin
                                                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary'
                                                    : 'bg-white/10'
                                            }`}
                                        >
                                            <HiUser className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">
                                                {user?.username}
                                            </p>
                                            <p
                                                className={`text-xs ${isAdmin ? 'text-accent-primary' : 'text-white/50'}`}
                                            >
                                                {isAdmin ? 'Admin' : 'Guest'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="ml-2 p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
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
                            className="mb-8 p-4 glass-card border-l-4 border-accent-primary"
                        >
                            <p className="text-white/80">
                                <span className="text-accent-primary font-medium">Welcome!</span>{' '}
                                Login to create and manage your own blog posts.
                            </p>
                        </motion.div>
                    )}

                    {isGuest && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 p-4 glass-card border-l-4 border-accent-secondary"
                        >
                            <p className="text-white/80">
                                <span className="text-accent-secondary font-medium">
                                    Hello {user?.username}!
                                </span>{' '}
                                You're browsing as a guest. Only admins can create or edit posts.
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
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === category
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
                        <div className="text-center py-16">
                            <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-white/60">Loading posts...</p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!isLoading && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card overflow-hidden group cursor-pointer"
                                    onClick={() => handlePostClick(post)}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-accent-primary/90 text-white text-xs font-medium rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
                                            <span className="flex items-center gap-1">
                                                <HiCalendar className="w-4 h-4" />
                                                {post.date ||
                                                    new Date(post.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <HiClock className="w-4 h-4" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-primary transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-accent-primary text-sm font-medium group-hover:gap-3 transition-all">
                                                Read More <HiArrowRight className="w-4 h-4" />
                                            </span>
                                            {post.author && (
                                                <span className="text-white/40 text-xs">
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
                            <p className="text-white/40 text-lg">No posts found in this category</p>
                        </div>
                    )}

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[
                            { value: posts.length, label: 'Articles Published' },
                            { value: categories.length - 1, label: 'Categories' },
                            { value: monthlyReaders, label: 'Monthly Readers' },
                            { value: totalComments, label: 'Comments' }
                        ].map((stat, index) => (
                            <div key={index} className="glass-card p-6 text-center">
                                <span className="text-3xl font-bold gradient-text block mb-2">
                                    {stat.value}
                                </span>
                                <span className="text-white/60 text-sm">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Background decorations */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[150px]" />

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
            <ScrollToTop />
        </>
    )
}

export default BlogPage
