import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiPencil, HiTrash, HiX, HiSave, HiPhotograph, HiUpload } from 'react-icons/hi'
import ConfirmModal from '../ui/ConfirmModal'

const BlogAdmin = ({ posts, onSave, onDelete, onClose }) => {
    const [editingPost, setEditingPost] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef(null)

    const emptyPost = {
        id: Date.now().toString(),
        title: '',
        excerpt: '',
        content: '',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        category: 'Development',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '5 min read'
    }

    const categories = ['Development', 'Design', 'Animation', 'CSS', 'React', 'Tutorial']

    // Helper function to show toast notification
    const showToast = (message, type = 'info') => {
        window.dispatchEvent(new CustomEvent('show-toast', {
            detail: { message, type }
        }))
    }

    const handleSave = (post) => {
        if (!post.title.trim() || !post.content.trim()) {
            showToast('Please fill in title and content', 'error')
            return
        }
        onSave(post)
        setEditingPost(null)
        setIsCreating(false)
    }

    const handleDeleteClick = (postId) => {
        setConfirmDelete(postId)
    }

    const handleConfirmDelete = () => {
        onDelete(confirmDelete)
        setConfirmDelete(null)
    }

    // Cloudinary image upload
    const handleImageUpload = async (e, setFormData) => {
        const file = e.target.files[0]
        if (!file) return

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('File size must be less than 5MB', 'error')
            return
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error')
            return
        }

        setIsUploading(true)

        try {
            // Try Cloudinary first if configured
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

            if (cloudName && uploadPreset && cloudName !== 'your_cloud_name') {
                // Upload to Cloudinary
                const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', uploadPreset)

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    {
                        method: 'POST',
                        body: formData
                    }
                )

                const data = await response.json()

                if (data.secure_url) {
                    setFormData(prev => ({ ...prev, image: data.secure_url }))
                    showToast('Image uploaded successfully!', 'success')
                } else {
                    throw new Error('Upload failed')
                }
            } else {
                // Fallback: Convert to base64 for local storage
                const reader = new FileReader()
                reader.onloadend = () => {
                    setFormData(prev => ({ ...prev, image: reader.result }))
                    showToast('Image saved locally (configure Cloudinary for cloud storage)', 'info')
                }
                reader.readAsDataURL(file)
            }
        } catch (error) {
            console.error('Upload error:', error)
            // Fallback to base64
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }))
            }
            reader.readAsDataURL(file)
        } finally {
            setIsUploading(false)
        }
    }

    const PostForm = ({ post, onSave, onCancel }) => {
        const [formData, setFormData] = useState({ ...post })

        const handleChange = (e) => {
            const { name, value } = e.target
            setFormData(prev => ({ ...prev, [name]: value }))
        }

        const updateReadTime = (content) => {
            const words = content.split(/\s+/).length
            const minutes = Math.ceil(words / 200)
            setFormData(prev => ({ ...prev, readTime: `${minutes} min read` }))
        }

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-sm'
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className='glass-card w-full max-w-3xl max-h-[90vh] overflow-auto'
                >
                    <div className='p-6 border-b border-white/10 flex items-center justify-between'>
                        <h3 className='text-xl font-bold text-white'>
                            {post.id && posts.find(p => p.id === post.id) ? 'Edit Post' : 'Create New Post'}
                        </h3>
                        <button
                            onClick={onCancel}
                            className='p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors'
                        >
                            <HiX className='w-5 h-5' />
                        </button>
                    </div>

                    <div className='p-6 space-y-6'>
                        {/* Title */}
                        <div>
                            <label className='block text-white/80 text-sm mb-2'>Title</label>
                            <input
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                placeholder='Enter post title...'
                                className='w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className='block text-white/80 text-sm mb-2'>Category</label>
                            <select
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                className='w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-primary'
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className='block text-white/80 text-sm mb-2'>Image</label>
                            <div className='flex gap-2'>
                                <input
                                    type='text'
                                    name='image'
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder='https://images.unsplash.com/...'
                                    className='flex-1 px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                                />
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    accept='image/*'
                                    onChange={(e) => handleImageUpload(e, setFormData)}
                                    className='hidden'
                                />
                                <button
                                    type='button'
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className='px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-accent-primary transition-colors disabled:opacity-50'
                                    title='Upload Image'
                                >
                                    {isUploading ? (
                                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                    ) : (
                                        <HiUpload className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                            {formData.image && formData.image.startsWith('data:') && (
                                <p className='text-yellow-400 text-xs mt-2'>⚠️ Image saved locally. Configure Cloudinary for cloud storage.</p>
                            )}
                            {formData.image && formData.image.startsWith('https://res.cloudinary.com') && (
                                <p className='text-green-400 text-xs mt-2'>✓ Image uploaded to Cloudinary</p>
                            )}
                        </div>

                        {/* Image Preview */}
                        {formData.image && (
                            <div>
                                <label className='block text-white/80 text-sm mb-2'>Preview</label>
                                <img
                                    src={formData.image}
                                    alt='Preview'
                                    className='w-full h-48 object-cover rounded-lg border border-white/10'
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'
                                    }}
                                />
                            </div>
                        )}

                        {/* Excerpt */}
                        <div>
                            <label className='block text-white/80 text-sm mb-2'>Excerpt</label>
                            <textarea
                                name='excerpt'
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder='Brief description for blog list...'
                                rows={2}
                                className='w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary resize-none'
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className='block text-white/80 text-sm mb-2'>Content (Markdown supported)</label>
                            <textarea
                                name='content'
                                value={formData.content}
                                onChange={(e) => {
                                    handleChange(e)
                                    updateReadTime(e.target.value)
                                }}
                                placeholder='Write your article content here... Use ## for headings, - for bullet points'
                                rows={12}
                                className='w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary resize-none font-mono text-sm'
                            />
                        </div>

                        {/* Read Time */}
                        <div>
                            <label className='block text-white/80 text-sm mb-2'>Read Time</label>
                            <input
                                type='text'
                                name='readTime'
                                value={formData.readTime}
                                onChange={handleChange}
                                placeholder='5 min read'
                                className='w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                            />
                        </div>
                    </div>

                    <div className='p-6 border-t border-white/10 flex justify-end gap-4'>
                        <button
                            onClick={onCancel}
                            className='px-6 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            className='btn-primary flex items-center gap-2'
                        >
                            <HiSave className='w-5 h-5' />
                            Save Post
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-sm'
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className='glass-card w-full max-w-4xl max-h-[90vh] overflow-auto'
                >
                    <div className='p-6 border-b border-white/10 flex items-center justify-between'>
                        <h2 className='text-2xl font-bold text-white'>Blog Admin</h2>
                        <div className='flex items-center gap-4'>
                            <button
                                onClick={() => setIsCreating(true)}
                                className='btn-primary flex items-center gap-2'
                            >
                                <HiPlus className='w-5 h-5' />
                                New Post
                            </button>
                            <button
                                onClick={onClose}
                                className='p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors'
                            >
                                <HiX className='w-6 h-6' />
                            </button>
                        </div>
                    </div>

                    <div className='p-6'>
                        <div className='space-y-4'>
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className='flex items-center gap-4 p-4 rounded-lg bg-dark-800/50 border border-white/5 hover:border-white/10 transition-colors'
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className='w-20 h-14 object-cover rounded-lg'
                                    />
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='text-white font-medium truncate'>{post.title}</h3>
                                        <div className='flex items-center gap-3 text-white/50 text-sm mt-1'>
                                            <span className='px-2 py-0.5 bg-accent-primary/20 text-accent-primary rounded-full text-xs'>
                                                {post.category}
                                            </span>
                                            <span>{post.date || new Date(post.created_at).toLocaleDateString()}</span>
                                            <span>{post.readTime}</span>
                                            {post.author && <span>by {post.author}</span>}
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button
                                            onClick={() => setEditingPost(post)}
                                            className='p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-accent-primary transition-colors'
                                            title='Edit'
                                        >
                                            <HiPencil className='w-5 h-5' />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(post.id)}
                                            className='p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors'
                                            title='Delete'
                                        >
                                            <HiTrash className='w-5 h-5' />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {posts.length === 0 && (
                            <div className='text-center py-12'>
                                <p className='text-white/40 mb-4'>No blog posts yet</p>
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className='btn-primary'
                                >
                                    Create Your First Post
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {editingPost && (
                    <PostForm
                        post={editingPost}
                        onSave={handleSave}
                        onCancel={() => setEditingPost(null)}
                    />
                )}
                {isCreating && (
                    <PostForm
                        post={{ ...emptyPost, id: Date.now().toString() }}
                        onSave={handleSave}
                        onCancel={() => setIsCreating(false)}
                    />
                )}
            </AnimatePresence>

            <ConfirmModal
                isOpen={confirmDelete !== null}
                onClose={() => setConfirmDelete(null)}
                onConfirm={handleConfirmDelete}
                title='Delete Post'
                message='Are you sure you want to delete this post? This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                type='danger'
            />
        </>
    )
}

export default BlogAdmin