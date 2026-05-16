import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogPost from '../components/sections/BlogPost'

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
        content: `Three.js has revolutionized the way we think about web experiences...`
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
        content: `Animation libraries have become essential tools...`
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
        content: `Tailwind CSS has transformed how developers approach styling...`
    }
]

const BlogPostPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        // Get posts from localStorage or use defaults
        const saved = localStorage.getItem('blogPosts')
        const posts = saved ? JSON.parse(saved) : defaultPosts

        // Find the post by id
        const foundPost = posts.find(p => p.id === parseInt(id))
        setPost(foundPost)
    }, [id])

    const handleBack = () => {
        navigate('/blog')
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-white mb-4">Bài viết không tồn tại</h1>
                    <button
                        onClick={handleBack}
                        className="btn-primary"
                    >
                        Quay lại Blog
                    </button>
                </div>
            </div>
        )
    }

    return <BlogPost post={post} onBack={handleBack} />
}

export default BlogPostPage