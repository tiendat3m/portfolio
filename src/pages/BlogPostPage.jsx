import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogPost from '../components/sections/BlogPost'
import { getStoredBlogPosts } from '../data/defaultPosts'

const BlogPostPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const posts = getStoredBlogPosts()

        // Find the post by id
        const foundPost = posts.find((p) => p.id === parseInt(id))
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
                    <button onClick={handleBack} className="btn-primary">
                        Quay lại Blog
                    </button>
                </div>
            </div>
        )
    }

    return <BlogPost post={post} onBack={handleBack} />
}

export default BlogPostPage
