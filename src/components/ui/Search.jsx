import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSearch, HiX } from 'react-icons/hi'

const Search = ({ posts, onSelectPost }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (query.trim()) {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                post.category.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered)
        } else {
            setResults([])
        }
    }, [query, posts])

    const handleSelect = (post) => {
        onSelectPost(post)
        setQuery('')
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors'
                title='Search'
            >
                <HiSearch className='w-5 h-5' />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4 bg-dark-950/95 backdrop-blur-sm'
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: -20 }}
                            className='w-full max-w-2xl'
                            onClick={e => e.stopPropagation()}
                        >
                            <div className='glass-card overflow-hidden'>
                                {/* Search Input */}
                                <div className='p-4 border-b border-white/10'>
                                    <div className='flex items-center gap-3'>
                                        <HiSearch className='w-6 h-6 text-white/50' />
                                        <input
                                            type='text'
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder='Search articles...'
                                            className='flex-1 bg-transparent text-white text-lg placeholder-white/40 focus:outline-none'
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className='p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors'
                                        >
                                            <HiX className='w-5 h-5' />
                                        </button>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className='max-h-96 overflow-auto'>
                                    {results.length > 0 ? (
                                        <div className='p-2'>
                                            {results.map((post) => (
                                                <button
                                                    key={post.id}
                                                    onClick={() => handleSelect(post)}
                                                    className='w-full p-4 text-left hover:bg-white/5 rounded-lg transition-colors'
                                                >
                                                    <div className='flex items-center gap-4'>
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className='w-16 h-12 object-cover rounded-lg'
                                                        />
                                                        <div className='flex-1 min-w-0'>
                                                            <h4 className='text-white font-medium truncate'>{post.title}</h4>
                                                            <p className='text-white/50 text-sm truncate'>{post.excerpt}</p>
                                                            <span className='text-accent-primary text-xs'>{post.category}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : query ? (
                                        <div className='p-8 text-center'>
                                            <p className='text-white/50'>No results found for "{query}"</p>
                                        </div>
                                    ) : (
                                        <div className='p-8 text-center'>
                                            <p className='text-white/50'>Start typing to search...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Search