import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX, HiPaperAirplane, HiUser, HiSparkles } from 'react-icons/hi'
import { sendMessageToAI, isAIConfigured, getAIStatus } from '../../services/aiService'

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: 'Xin chào! 👋 Tôi là trợ lý AI, tôi có thể giúp gì cho bạn?',
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            isAI: isAIConfigured()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [aiStatus, setAiStatus] = useState(getAIStatus())
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMessage])
        const currentInput = inputValue
        setInputValue('')
        setIsTyping(true)

        try {
            // Get conversation history for context
            const conversationHistory = messages.map(msg => ({
                type: msg.type,
                content: msg.content
            }))

            // Call AI service
            const response = await sendMessageToAI(currentInput, conversationHistory)

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: response.message,
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                isAI: !response.fallback,
                usage: response.usage
            }

            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau!',
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                isAI: false
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-24 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-shadow ${aiStatus.configured
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/30 hover:shadow-purple-500/50'
                    : 'bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/30 hover:shadow-green-500/50'
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                {isOpen ? (
                    <HiX className='w-6 h-6' />
                ) : (
                    <div className='relative'>
                        {aiStatus.configured ? (
                            <HiSparkles className='w-6 h-6' />
                        ) : (
                            <HiChat className='w-6 h-6' />
                        )}
                        {aiStatus.configured && (
                            <span className='absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse' />
                        )}
                    </div>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className='fixed bottom-44 right-8 z-50 w-80 md:w-96 glass-card overflow-hidden'
                    >
                        {/* Header */}
                        <div className={`p-4 ${aiStatus.configured
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-gradient-to-r from-green-500 to-green-600'
                            }`}>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center'>
                                    {aiStatus.configured ? (
                                        <HiSparkles className='w-5 h-5 text-white' />
                                    ) : (
                                        <HiChat className='w-5 h-5 text-white' />
                                    )}
                                </div>
                                <div>
                                    <h4 className='text-white font-medium'>
                                        {aiStatus.configured ? 'AI Assistant' : 'Live Chat'}
                                    </h4>
                                    <p className='text-white/70 text-xs'>
                                        {aiStatus.configured ? 'Powered by OpenAI' : 'Đang hoạt động'}
                                    </p>
                                </div>
                                <div className='ml-auto flex items-center gap-1'>
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${aiStatus.configured ? 'bg-purple-300' : 'bg-green-300'}`} />
                                    <span className='text-white/70 text-xs'>Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className='h-80 overflow-y-auto p-4 space-y-4'>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user'
                                            ? 'bg-accent-primary'
                                            : message.isAI
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                                : 'bg-green-500'
                                            }`}>
                                            {message.type === 'user' ? (
                                                <HiUser className='w-4 h-4 text-white' />
                                            ) : message.isAI ? (
                                                <HiSparkles className='w-4 h-4 text-white' />
                                            ) : (
                                                <HiChat className='w-4 h-4 text-white' />
                                            )}
                                        </div>
                                        <div className={`rounded-2xl px-4 py-2 ${message.type === 'user'
                                            ? 'bg-accent-primary text-white rounded-br-none'
                                            : 'bg-dark-800 text-white rounded-bl-none'
                                            }`}>
                                            <p className='text-sm whitespace-pre-wrap'>{message.content}</p>
                                            <div className='flex items-center gap-2 mt-1'>
                                                <p className='text-xs opacity-50'>{message.time}</p>
                                                {message.isAI && (
                                                    <span className='text-xs text-purple-400 flex items-center gap-1'>
                                                        <HiSparkles className='w-3 h-3' /> AI
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className='flex justify-start'>
                                    <div className='flex items-center gap-2'>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${aiStatus.configured
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                            : 'bg-green-500'
                                            }`}>
                                            {aiStatus.configured ? (
                                                <HiSparkles className='w-4 h-4 text-white' />
                                            ) : (
                                                <HiChat className='w-4 h-4 text-white' />
                                            )}
                                        </div>
                                        <div className='bg-dark-800 rounded-2xl rounded-bl-none px-4 py-3'>
                                            <div className='flex gap-1'>
                                                <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce' style={{ animationDelay: '0ms' }} />
                                                <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce' style={{ animationDelay: '150ms' }} />
                                                <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce' style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className='p-4 border-t border-white/10'>
                            <div className='flex gap-2'>
                                <input
                                    type='text'
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder='Nhập tin nhắn...'
                                    className='flex-1 px-4 py-2 bg-dark-800 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-green-500 text-sm'
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <HiPaperAirplane className='w-5 h-5' />
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className='flex gap-2 mt-3'>
                                <button
                                    onClick={() => setInputValue('Tôi cần tư vấn')}
                                    className='px-3 py-1 bg-white/5 rounded-full text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors'
                                >
                                    Tư vấn
                                </button>
                                <button
                                    onClick={() => setInputValue('Báo giá')}
                                    className='px-3 py-1 bg-white/5 rounded-full text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors'
                                >
                                    Báo giá
                                </button>
                                <button
                                    onClick={() => setInputValue('Hỗ trợ kỹ thuật')}
                                    className='px-3 py-1 bg-white/5 rounded-full text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors'
                                >
                                    Hỗ trợ
                                </button>
                            </div>
                        </div>

                        {/* Zalo Link */}
                        <div className='px-4 pb-4'>
                            <a
                                href='https://zalo.me/0343759130'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center justify-center gap-2 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
                            >
                                <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
                                </svg>
                                Chat qua Zalo
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default LiveChat