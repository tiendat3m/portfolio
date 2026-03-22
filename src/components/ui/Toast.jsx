import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheck, HiX, HiExclamation, HiInformationCircle } from 'react-icons/hi'

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const icons = {
        success: <HiCheck className='w-5 h-5' />,
        error: <HiX className='w-5 h-5' />,
        warning: <HiExclamation className='w-5 h-5' />,
        info: <HiInformationCircle className='w-5 h-5' />
    }

    const colors = {
        success: 'bg-green-500/20 border-green-500/30 text-green-400',
        error: 'bg-red-500/20 border-red-500/30 text-red-400',
        warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
        info: 'bg-blue-500/20 border-blue-500/30 text-blue-400'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 right-8 z-[400] px-6 py-4 rounded-lg border backdrop-blur-xl ${colors[type]} flex items-center gap-3`}
        >
            {icons[type]}
            <span className='font-medium'>{message}</span>
            <button
                onClick={onClose}
                className='ml-2 hover:opacity-70 transition-opacity'
            >
                <HiX className='w-4 h-4' />
            </button>
        </motion.div>
    )
}

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <AnimatePresence>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </AnimatePresence>
    )
}

// Custom hook for toast
export const useToast = () => {
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type, duration }])
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return { toasts, addToast, removeToast }
}

export default Toast