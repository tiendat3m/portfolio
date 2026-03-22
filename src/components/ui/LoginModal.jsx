import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext'

const LoginModal = () => {
    const { showLoginModal, setShowLoginModal, login, loginAsGuest } = useAuth()
    const [mode, setMode] = useState('login') // 'login' or 'guest'
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = login(password, username || 'Admin')
        if (!result.success) {
            setError(result.error)
        }
        setIsLoading(false)
    }

    const handleGuestLogin = async (e) => {
        e.preventDefault()
        if (!username.trim()) {
            setError('Please enter a username')
            return
        }

        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 300))
        loginAsGuest(username)
        setIsLoading(false)
    }

    const handleClose = () => {
        setShowLoginModal(false)
        setPassword('')
        setUsername('')
        setError('')
        setMode('login')
    }

    if (!showLoginModal) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-sm'
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className='glass-card w-full max-w-md overflow-hidden'
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className='p-6 border-b border-white/10 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center'>
                                <HiLockClosed className='w-5 h-5 text-white' />
                            </div>
                            <div>
                                <h3 className='text-xl font-bold text-white'>
                                    {mode === 'login' ? 'Admin Login' : 'Guest Login'}
                                </h3>
                                <p className='text-white/50 text-sm'>
                                    {mode === 'login'
                                        ? 'Login to manage blog posts'
                                        : 'Enter your name to comment'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className='p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors'
                        >
                            <HiX className='w-5 h-5' />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                        {/* Mode Toggle */}
                        <div className='flex gap-2 mb-6'>
                            <button
                                onClick={() => { setMode('login'); setError('') }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'login'
                                        ? 'bg-accent-primary text-white'
                                        : 'bg-white/5 text-white/60 hover:text-white'
                                    }`}
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => { setMode('guest'); setError('') }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'guest'
                                        ? 'bg-accent-primary text-white'
                                        : 'bg-white/5 text-white/60 hover:text-white'
                                    }`}
                            >
                                Guest
                            </button>
                        </div>

                        {mode === 'login' ? (
                            <form onSubmit={handleLogin} className='space-y-4'>
                                <div>
                                    <label className='block text-white/80 text-sm mb-2'>
                                        Username (optional)
                                    </label>
                                    <div className='relative'>
                                        <HiUser className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40' />
                                        <input
                                            type='text'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder='Admin'
                                            className='w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-white/80 text-sm mb-2'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <HiLockClosed className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40' />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Enter admin password'
                                            className='w-full pl-12 pr-12 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                                            required
                                        />
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white'
                                        >
                                            {showPassword ? (
                                                <HiEyeOff className='w-5 h-5' />
                                            ) : (
                                                <HiEye className='w-5 h-5' />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className='text-red-400 text-sm'
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50'
                                >
                                    {isLoading ? (
                                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                    ) : (
                                        <>
                                            <HiLockClosed className='w-5 h-5' />
                                            Login as Admin
                                        </>
                                    )}
                                </button>

                                <p className='text-white/40 text-xs text-center mt-4'>
                                    Default password: admin123
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={handleGuestLogin} className='space-y-4'>
                                <div>
                                    <label className='block text-white/80 text-sm mb-2'>
                                        Your Name
                                    </label>
                                    <div className='relative'>
                                        <HiUser className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40' />
                                        <input
                                            type='text'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder='Enter your name'
                                            className='w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-primary'
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className='text-red-400 text-sm'
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-full btn-outline py-3 flex items-center justify-center gap-2 disabled:opacity-50'
                                >
                                    {isLoading ? (
                                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                    ) : (
                                        <>
                                            <HiUser className='w-5 h-5' />
                                            Continue as Guest
                                        </>
                                    )}
                                </button>

                                <p className='text-white/40 text-xs text-center mt-4'>
                                    Guests can view and read articles
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default LoginModal