import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX, HiPaperAirplane, HiUser, HiSparkles } from 'react-icons/hi'

const AI_PROVIDER_LABELS = {
    openai: 'OpenAI GPT',
    gemini: 'Google Gemini',
    huggingface: 'Hugging Face',
    groq: 'Groq'
}

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: 'Xin chào! 👋 Tôi là trợ lý AI, tôi có thể giúp gì cho bạn?',
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            isAI: false
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [aiStatus, setAiStatus] = useState({
        configured: false,
        message: 'Loading assistant status...',
        provider: null
    })
    const messagesEndRef = useRef(null)
    const chatRef = useRef(null)
    const aiServiceRef = useRef(null)

    const loadAIService = useCallback(async () => {
        if (aiServiceRef.current) {
            return aiServiceRef.current
        }

        const service = await import('../../services/aiService')
        aiServiceRef.current = service

        const nextStatus = service.getAIStatus()
        setAiStatus(nextStatus)
        setMessages((prev) =>
            prev.map((message, index) =>
                index === 0 ? { ...message, isAI: service.isAIConfigured() } : message
            )
        )

        return service
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        loadAIService().catch(() => {
            setAiStatus({
                configured: false,
                message: 'AI assistant is not configured. Using fallback responses.',
                provider: null
            })
        })
    }, [isOpen, loadAIService])

    const handleSend = async () => {
        const trimmedInput = inputValue.trim()
        if (!trimmedInput || isTyping) return

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: trimmedInput,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }

        setMessages((prev) => [...prev, userMessage])
        const currentInput = trimmedInput
        setInputValue('')
        setIsTyping(true)

        try {
            const aiService = await loadAIService()

            // Get conversation history for context
            const conversationHistory = [...messages, userMessage].map((msg) => ({
                type: msg.type,
                content: msg.content
            }))

            // Call AI service
            const response = await aiService.sendMessageToAI(currentInput, conversationHistory)

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: response.message,
                time: new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                isAI: !response.fallback,
                usage: response.usage
            }

            setMessages((prev) => [...prev, botMessage])
        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau!',
                time: new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                isAI: false
            }
            setMessages((prev) => [...prev, errorMessage])
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

    const providerLabel = aiStatus.provider ? AI_PROVIDER_LABELS[aiStatus.provider] : 'Live Chat'

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => {
                    void loadAIService().catch(() => {})
                }}
                className="fixed bottom-36 right-6 z-50 flex h-14 w-14 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                {isOpen ? (
                    <HiX className="w-6 h-6" />
                ) : (
                    <div className="relative">
                        {aiStatus.configured ? (
                            <HiSparkles className="w-6 h-6" />
                        ) : (
                            <HiChat className="w-6 h-6" />
                        )}
                        {aiStatus.configured && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse border border-terminal-accent bg-terminal-accent" />
                        )}
                    </div>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-52 right-6 z-50 w-80 md:w-96 overflow-hidden border border-terminal-border bg-terminal-surface/85 backdrop-blur-sm"
                    >
                        {/* Header */}
                        <div className="border-b border-terminal-border bg-terminal-surface p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-bg">
                                    {aiStatus.configured ? (
                                        <HiSparkles className="w-5 h-5 text-terminal-accent" />
                                    ) : (
                                        <HiChat className="w-5 h-5 text-terminal-accent" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-medium text-terminal-green">
                                        {aiStatus.configured ? 'AI Assistant' : 'Live Chat'}
                                    </h4>
                                    <p className="text-xs text-terminal-text/70">
                                        {aiStatus.configured
                                            ? `Powered by ${providerLabel}`
                                            : 'Đang hoạt động'}
                                    </p>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    <span className="h-2 w-2 animate-pulse bg-terminal-accent" />
                                    <span className="text-xs text-terminal-text/70">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                message.type === 'user'
                                                    ? 'border border-terminal-accent bg-terminal-accent text-terminal-bg'
                                                    : 'border border-terminal-border bg-terminal-bg text-terminal-green'
                                            }`}
                                        >
                                            {message.type === 'user' ? (
                                                <HiUser className="w-4 h-4" />
                                            ) : message.isAI ? (
                                                <HiSparkles className="w-4 h-4 text-terminal-accent" />
                                            ) : (
                                                <HiChat className="w-4 h-4 text-terminal-accent" />
                                            )}
                                        </div>
                                        <div
                                            className={`rounded-2xl px-4 py-2 ${
                                                message.type === 'user'
                                                    ? 'border border-terminal-accent bg-terminal-accent/10 text-terminal-accent'
                                                    : 'border border-terminal-border bg-terminal-surface text-terminal-text'
                                            }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">
                                                {message.content}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-xs opacity-50">{message.time}</p>
                                                {message.isAI && (
                                                    <span className="flex items-center gap-1 text-xs text-terminal-accent">
                                                        <HiSparkles className="w-3 h-3" /> AI
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                aiStatus.configured
                                                    ? 'border border-terminal-border bg-terminal-bg'
                                                    : 'border border-terminal-border bg-terminal-bg'
                                            }`}
                                        >
                                            {aiStatus.configured ? (
                                                <HiSparkles className="w-4 h-4 text-terminal-accent" />
                                            ) : (
                                                <HiChat className="w-4 h-4 text-terminal-accent" />
                                            )}
                                        </div>
                                        <div className="border border-terminal-border bg-terminal-surface px-4 py-3">
                                            <div className="flex gap-1">
                                                <span
                                                    className="h-2 w-2 animate-bounce bg-terminal-muted"
                                                    style={{ animationDelay: '0ms' }}
                                                />
                                                <span
                                                    className="h-2 w-2 animate-bounce bg-terminal-muted"
                                                    style={{ animationDelay: '150ms' }}
                                                />
                                                <span
                                                    className="h-2 w-2 animate-bounce bg-terminal-muted"
                                                    style={{ animationDelay: '300ms' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-terminal-border p-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 border border-terminal-border bg-terminal-surface px-4 py-2 text-sm text-terminal-green placeholder-terminal-muted focus:border-terminal-accent focus:outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <HiPaperAirplane className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() =>
                                        setInputValue(
                                            'Mình cần Đạt tư vấn giải pháp phù hợp cho website/app của mình'
                                        )
                                    }
                                    className="border border-terminal-border bg-terminal-surface px-3 py-1 text-xs text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                                >
                                    Tư vấn
                                </button>
                                <button
                                    onClick={() =>
                                        setInputValue(
                                            'Đạt có thể hỗ trợ mình nâng cấp UI và tích hợp AI chatbox không?'
                                        )
                                    }
                                    className="border border-terminal-border bg-terminal-surface px-3 py-1 text-xs text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                                >
                                    Hỗ trợ
                                </button>
                                <button
                                    onClick={() =>
                                        setInputValue(
                                            'Mình muốn trao đổi nhanh với Đạt về dự án, bắt đầu như thế nào?'
                                        )
                                    }
                                    className="border border-terminal-border bg-terminal-surface px-3 py-1 text-xs text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                                >
                                    Hợp tác
                                </button>
                            </div>
                        </div>

                        {/* Zalo Link */}
                        <div className="px-4 pb-4">
                            <a
                                href="https://zalo.me/0343759130"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 border border-terminal-border bg-terminal-surface py-2 text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
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
