import React, { useDeferredValue, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSearch, HiX } from 'react-icons/hi'

const Search = ({ posts, onSelectPost }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const deferredQuery = useDeferredValue(query)

    const results = useMemo(() => {
        const normalizedQuery = deferredQuery.trim().toLowerCase()

        if (!normalizedQuery) {
            return []
        }

        return posts.filter(
            (post) =>
                post.title.toLowerCase().includes(normalizedQuery) ||
                post.excerpt.toLowerCase().includes(normalizedQuery) ||
                post.category.toLowerCase().includes(normalizedQuery)
        )
    }, [deferredQuery, posts])

    const handleSelect = (post) => {
        onSelectPost(post)
        setQuery('')
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="border border-terminal-border bg-terminal-surface p-2 text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                title="Search"
            >
                <HiSearch className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-start justify-center bg-terminal-bg/95 px-4 pt-24 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: -20 }}
                            className="w-full max-w-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="glass-card overflow-hidden">
                                {/* Search Input */}
                                <div className="border-b border-terminal-border p-4">
                                    <div className="flex items-center gap-3">
                                        <HiSearch className="h-6 w-6 text-terminal-accent" />
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search articles..."
                                            className="flex-1 bg-transparent text-lg text-terminal-green placeholder-terminal-muted focus:outline-none"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="border border-terminal-border bg-terminal-bg p-2 text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                                        >
                                            <HiX className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="max-h-96 overflow-auto">
                                    {results.length > 0 ? (
                                        <div className="p-2">
                                            {results.map((post) => (
                                                <button
                                                    key={post.id}
                                                    onClick={() => handleSelect(post)}
                                                    className="terminal-row-link w-full border border-transparent p-4 text-left transition-colors hover:border-terminal-border hover:bg-terminal-bg"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="h-12 w-16 border border-terminal-border object-cover grayscale"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="truncate font-medium text-terminal-green">
                                                                {post.title}
                                                            </h4>
                                                            <p className="truncate text-sm text-terminal-text/60">
                                                                {post.excerpt}
                                                            </p>
                                                            <span className="text-xs text-terminal-accent">
                                                                {post.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : query ? (
                                        <div className="p-8 text-center">
                                            <p className="text-terminal-muted">
                                                No results found for "{query}"
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center">
                                            <p className="text-terminal-muted">
                                                Start typing to search...
                                            </p>
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
