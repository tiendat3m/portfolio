import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HiPlus,
    HiPencil,
    HiTrash,
    HiX,
    HiSave,
    HiUpload,
    HiEye,
    HiDocumentText
} from 'react-icons/hi'
import { BiBold, BiItalic, BiCode, BiListUl, BiHeading, BiLink, BiImage } from 'react-icons/bi'
import ConfirmModal from '../ui/ConfirmModal'
import { renderSafeMarkdownPreview } from '../../utils/markdown'

// Markdown Editor Component with Toolbar
const MarkdownEditor = ({ value, onChange, placeholder }) => {
    const textareaRef = useRef(null)
    const [isPreview, setIsPreview] = useState(false)

    const insertText = useCallback(
        (before, after = '') => {
            const textarea = textareaRef.current
            if (!textarea) return

            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const selectedText = value.substring(start, end)
            const newText =
                value.substring(0, start) + before + selectedText + after + value.substring(end)

            onChange({ target: { name: 'content', value: newText } })

            // Reset cursor position
            setTimeout(() => {
                textarea.focus()
                textarea.setSelectionRange(start + before.length, end + before.length)
            }, 0)
        },
        [value, onChange]
    )

    const toolbarButtons = [
        { icon: BiBold, label: 'Bold', action: () => insertText('**', '**') },
        { icon: BiItalic, label: 'Italic', action: () => insertText('*', '*') },
        { icon: BiCode, label: 'Code', action: () => insertText('`', '`') },
        { type: 'divider' },
        { icon: BiHeading, label: 'Heading', action: () => insertText('\n## ') },
        { icon: BiListUl, label: 'Bullet List', action: () => insertText('\n- ') },
        { type: 'divider' },
        { icon: BiLink, label: 'Link', action: () => insertText('[', '](url)') },
        { icon: BiImage, label: 'Image', action: () => insertText('![alt](', ')') }
    ]

    return (
        <div className="space-y-2">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-dark-900 border border-white/10 rounded-t-lg">
                {toolbarButtons.map((btn, idx) => {
                    if (btn.type === 'divider') {
                        return <div key={idx} className="w-px h-6 bg-white/10 mx-1" />
                    }
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={btn.action}
                            className="p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                            title={btn.label}
                        >
                            <btn.icon className="w-4 h-4" />
                        </button>
                    )
                })}
                <div className="flex-1" />
                <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className={`p-2 rounded transition-colors ${isPreview ? 'bg-accent-primary text-white' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}
                    title={isPreview ? 'Edit' : 'Preview'}
                >
                    {isPreview ? <HiPencil className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
            </div>

            {/* Editor / Preview */}
            {isPreview ? (
                <div
                    className="w-full min-h-[300px] px-4 py-3 bg-dark-800 border border-white/10 rounded-b-lg overflow-auto"
                    dangerouslySetInnerHTML={{ __html: renderSafeMarkdownPreview(value) }}
                />
            ) : (
                <textarea
                    ref={textareaRef}
                    name="content"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={12}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-b-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary resize-none font-mono text-sm"
                />
            )}
        </div>
    )
}

const BlogAdmin = ({ posts, onSave, onDelete, onClose }) => {
    const [editingPost, setEditingPost] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const fileInputRef = useRef(null)

    const emptyPost = {
        id: Date.now().toString(),
        title: '',
        excerpt: '',
        content: '',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        category: 'Development',
        date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        readTime: '5 min read'
    }

    const categories = [
        'Development',
        'Design',
        'Animation',
        'CSS',
        'React',
        'Tutorial',
        'JavaScript',
        'TypeScript'
    ]

    const showToast = (message, type = 'info') => {
        window.dispatchEvent(
            new CustomEvent('show-toast', {
                detail: { message, type }
            })
        )
    }

    const handleSave = (post) => {
        if (!post.title.trim()) {
            showToast('Please enter a title', 'error')
            return
        }
        if (!post.content.trim()) {
            showToast('Please enter content', 'error')
            return
        }
        if (!post.excerpt.trim()) {
            showToast('Please enter an excerpt', 'error')
            return
        }
        onSave(post)
        setEditingPost(null)
        setIsCreating(false)
        showToast('Post saved successfully!', 'success')
    }

    const handleDeleteClick = (postId) => {
        setConfirmDelete(postId)
    }

    const handleConfirmDelete = () => {
        onDelete(confirmDelete)
        setConfirmDelete(null)
        showToast('Post deleted', 'info')
    }

    const handleImageUpload = async (e, setFormData) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            showToast('File size must be less than 5MB', 'error')
            return
        }

        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error')
            return
        }

        setIsUploading(true)
        setUploadProgress(0)

        try {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

            if (cloudName && uploadPreset && cloudName !== 'your_cloud_name') {
                const formDataUpload = new FormData()
                formDataUpload.append('file', file)
                formDataUpload.append('upload_preset', uploadPreset)

                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        setUploadProgress(Math.round((e.loaded / e.total) * 100))
                    }
                })

                const response = await new Promise((resolve, reject) => {
                    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)
                    xhr.onload = () => resolve(JSON.parse(xhr.responseText))
                    xhr.onerror = () => reject(new Error('Upload failed'))
                    xhr.send(formDataUpload)
                })

                if (response.secure_url) {
                    setFormData((prev) => ({ ...prev, image: response.secure_url }))
                    showToast('Image uploaded successfully!', 'success')
                } else {
                    throw new Error('Upload failed')
                }
            } else {
                const reader = new FileReader()
                reader.onprogress = (e) => {
                    if (e.lengthComputable) {
                        setUploadProgress(Math.round((e.loaded / e.total) * 100))
                    }
                }
                reader.onloadend = () => {
                    setFormData((prev) => ({ ...prev, image: reader.result }))
                    showToast(
                        'Image saved locally (configure Cloudinary for cloud storage)',
                        'info'
                    )
                }
                reader.readAsDataURL(file)
            }
        } catch (error) {
            console.error('Upload error:', error)
            showToast('Upload failed. Using fallback.', 'error')
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }))
            }
            reader.readAsDataURL(file)
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    const PostForm = ({ post, onSave, onCancel }) => {
        const [formData, setFormData] = useState({ ...post })
        const [activeTab, setActiveTab] = useState('content')

        const handleChange = (e) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))
        }

        const updateReadTime = (content) => {
            const words = content.split(/\s+/).filter((w) => w.length > 0).length
            const minutes = Math.max(1, Math.ceil(words / 200))
            setFormData((prev) => ({ ...prev, readTime: `${minutes} min read` }))
        }

        const handleContentChange = (e) => {
            handleChange(e)
            updateReadTime(e.target.value)
        }

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-3 md:p-5 bg-dark-950/90 backdrop-blur-md overflow-y-auto"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-card w-full max-w-5xl my-2 md:my-4 max-h-[92vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 px-5 md:px-6 py-4 border-b border-white/10 flex items-center justify-between bg-dark-900/95 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                                <HiDocumentText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    {post.id && posts.find((p) => p.id === post.id)
                                        ? 'Edit Post'
                                        : 'Create New Post'}
                                </h3>
                                <p className="text-white/50 text-xs">Fill in the details below</p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                        >
                            <HiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-5 md:px-6 py-5 md:py-6 space-y-5 overflow-y-auto flex-1 pb-24 bg-dark-900/20">
                        {/* Title */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter a compelling title..."
                                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white text-lg placeholder-white/40 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
                            />
                        </div>

                        {/* Category & Read Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Read Time
                                </label>
                                <input
                                    type="text"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    placeholder="5 min read"
                                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Cover Image
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    className="flex-1 px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary transition-all"
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setFormData)}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-accent-primary transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>{uploadProgress}%</span>
                                        </>
                                    ) : (
                                        <HiUpload className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {isUploading && uploadProgress > 0 && (
                                <div className="mt-2">
                                    <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Image Preview */}
                        {formData.image && (
                            <div className="relative group">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg border border-white/10"
                                    onError={(e) => {
                                        e.target.src =
                                            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                            </div>
                        )}

                        {/* Excerpt */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Excerpt <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Write a brief description that will appear in the blog list..."
                                rows={2}
                                maxLength={200}
                                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all resize-none"
                            />
                            <p className="text-white/40 text-xs mt-1">
                                {formData.excerpt?.length || 0}/200 characters
                            </p>
                        </div>

                        {/* Content Editor with Tabs */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Content <span className="text-red-400">*</span>
                                <span className="text-white/40 text-xs ml-2">
                                    (Markdown supported)
                                </span>
                            </label>

                            {/* Tabs */}
                            <div className="flex border-b border-white/10 mb-0">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('content')}
                                    className={`px-4 py-2 text-sm font-medium transition-all ${
                                        activeTab === 'content'
                                            ? 'text-accent-primary border-b-2 border-accent-primary'
                                            : 'text-white/50 hover:text-white'
                                    }`}
                                >
                                    Write
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-4 py-2 text-sm font-medium transition-all ${
                                        activeTab === 'preview'
                                            ? 'text-accent-primary border-b-2 border-accent-primary'
                                            : 'text-white/50 hover:text-white'
                                    }`}
                                >
                                    Preview
                                </button>
                            </div>

                            {activeTab === 'content' ? (
                                <MarkdownEditor
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    placeholder={
                                        'Write your article content here...\n\n## Heading\n\nYour paragraph text...\n\n- Bullet point\n- Another point\n\n**Bold text** and *italic text*'
                                    }
                                />
                            ) : (
                                <div className="w-full min-h-[300px] px-4 py-3 bg-dark-800 border border-white/10 rounded-lg overflow-auto prose prose-invert max-w-none">
                                    {formData.content ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: renderSafeMarkdownPreview(formData.content)
                                            }}
                                        />
                                    ) : (
                                        <p className="text-white/40 italic">
                                            No content yet. Switch to Write tab to add content.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Word Count */}
                        <div className="flex items-center gap-4 text-sm text-white/50">
                            <span>
                                {formData.content?.split(/\s+/).filter((w) => w.length > 0)
                                    .length || 0}{' '}
                                words
                            </span>
                            <span>•</span>
                            <span>{formData.content?.length || 0} characters</span>
                            <span>•</span>
                            <span>~{formData.readTime}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 px-5 md:px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between sm:items-center bg-dark-900/95 backdrop-blur-md">
                        <p className="text-white/40 text-sm">
                            <span className="text-red-400">*</span> Required fields
                        </p>
                        <div className="flex w-full sm:w-auto gap-3">
                            <button
                                onClick={onCancel}
                                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onSave(formData)}
                                className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2 px-6"
                            >
                                <HiSave className="w-5 h-5" />
                                Save Post
                            </button>
                        </div>
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
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-dark-900/50 shrink-0">
                        <h2 className="text-xl font-bold text-white">Blog Admin</h2>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="btn-primary flex items-center gap-2 text-sm"
                            >
                                <HiPlus className="w-4 h-4" />
                                New Post
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                            >
                                <HiX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-800 flex items-center justify-center">
                                    <HiDocumentText className="w-8 h-8 text-white/40" />
                                </div>
                                <p className="text-white/40 mb-4">No blog posts yet</p>
                                <button onClick={() => setIsCreating(true)} className="btn-primary">
                                    Create Your First Post
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {posts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50 border border-white/5 hover:border-white/10 hover:bg-dark-800 transition-all group"
                                    >
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-20 h-14 object-cover rounded-lg shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-medium truncate">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-white/50 text-sm mt-1">
                                                <span className="px-2 py-0.5 bg-accent-primary/20 text-accent-primary rounded-full text-xs">
                                                    {post.category}
                                                </span>
                                                <span>
                                                    {post.date ||
                                                        new Date(
                                                            post.created_at
                                                        ).toLocaleDateString()}
                                                </span>
                                                <span>{post.readTime}</span>
                                                {post.author && <span>by {post.author}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => setEditingPost(post)}
                                                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-accent-primary transition-colors"
                                                title="Edit"
                                            >
                                                <HiPencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(post.id)}
                                                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <HiTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
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
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </>
    )
}

export default BlogAdmin
