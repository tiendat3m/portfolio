import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiExclamation, HiX } from 'react-icons/hi'

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger' // 'danger' or 'warning'
}) => {
    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-[250] flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-sm'
                onClick={onClose}
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
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'danger'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                <HiExclamation className='w-5 h-5' />
                            </div>
                            <h3 className='text-xl font-bold text-white'>{title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className='p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors'
                        >
                            <HiX className='w-5 h-5' />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                        <p className='text-white/70 leading-relaxed'>{message}</p>
                    </div>

                    {/* Actions */}
                    <div className='p-6 border-t border-white/10 flex justify-end gap-4'>
                        <button
                            onClick={onClose}
                            className='px-6 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors'
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={handleConfirm}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${type === 'danger'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ConfirmModal