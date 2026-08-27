import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiTerminal, HiX } from 'react-icons/hi'

/**
 * CommandPalette — a fake terminal input that drives site navigation.
 *
 * Users type commands to jump to sections (cd projects), list targets (ls),
 * or get help. Unknown commands print `command not found: <cmd>` like a real
 * shell. Toggle with the floating button or Ctrl/Cmd+K.
 *
 * The output log mirrors a terminal session; each submission pushes a line.
 * Reduced-motion users still get full functionality (only entrance animation
 * is affected, handled globally in CSS).
 */

const SECTIONS = [
    { id: 'hero', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'skills', label: 'skills' },
    { id: 'services', label: 'services' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'testimonials', label: 'testimonials' },
    { id: 'blog', label: 'blog' },
    { id: 'contact', label: 'contact' }
]

const HELP_TEXT = [
    'available commands:',
    '  help              show this list',
    '  ls                list navigable sections',
    '  cd <section>      scroll to a section',
    '  whoami            print identity',
    '  about             short bio',
    '  clear             clear the screen',
    '  exit              close terminal'
]

const runCommand = (raw) => {
    const input = raw.trim().toLowerCase()
    if (!input) return { lines: [] }

    const [cmd, ...args] = input.split(/\s+/)

    switch (cmd) {
        case 'help':
            return { lines: HELP_TEXT }
        case 'ls': {
            const list = SECTIONS.map((s) => `  ${s.label}/`)
            return { lines: ['drwxr-xr-x  user  portfolio', ...list] }
        }
        case 'cd': {
            const target = args[0]
            if (!target) return { lines: ['cd: missing argument'] }
            const match = SECTIONS.find((s) => s.label === target || s.id === target)
            if (!match) {
                return { lines: [`cd: no such section: ${target}`] }
            }
            // Defer scroll until after state update via returned action.
            return {
                lines: [`> navigating to ${match.label}/`],
                action: () =>
                    document
                        .getElementById(match.id)
                        ?.scrollIntoView({ behavior: 'smooth' })
            }
        }
        case 'whoami':
            return { lines: ['phan-tien-dat -- frontend-developer'] }
        case 'about':
            return {
                lines: [
                    'Frontend Developer based in Ho Chi Minh City.',
                    'Focus: React / Angular / Tailwind / product UI.'
                ]
            }
        case 'clear':
            return { lines: [], clear: true }
        case 'exit':
            return { lines: ['logout'], action: 'exit' }
        default:
            return { lines: [`command not found: ${cmd}`] }
    }
}

const CommandPalette = () => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [history, setHistory] = useState([
        { type: 'out', text: 'portfolio shell v1.0 — type "help" for commands.' }
    ])
    const inputRef = useRef(null)
    const logRef = useRef(null)

    // Toggle via Ctrl/Cmd+K.
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setOpen((o) => !o)
            } else if (e.key === 'Escape') {
                setOpen(false)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // Focus input when opening; auto-scroll log to bottom on new lines.
    useEffect(() => {
        if (open) inputRef.current?.focus()
    }, [open])

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
    }, [history])

    const submit = (e) => {
        e.preventDefault()
        const raw = input
        const promptLine = { type: 'in', text: raw }
        const result = runCommand(raw)

        if (result.clear) {
            setHistory([])
            setInput('')
            return
        }

        const outLines = result.lines.map((text) => ({ type: 'out', text }))
        setHistory((h) => [...h, promptLine, ...outLines])
        setInput('')

        if (result.action === 'exit') {
            setTimeout(() => setOpen(false), 250)
        } else if (typeof result.action === 'function') {
            setTimeout(result.action, 120)
        }
    }

    return (
        <>
            {/* Floating toggle button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-green transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                aria-label="Open command palette"
                title="Command palette (Ctrl+K)"
            >
                <HiTerminal className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 p-4 pt-[12vh]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            className="w-full max-w-xl border border-terminal-border bg-terminal-panel"
                            initial={{ y: -16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -16, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Title bar */}
                            <div className="flex items-center gap-2 border-b border-terminal-border px-3 py-2">
                                <span className="terminal-dot bg-red-500" />
                                <span className="terminal-dot bg-yellow-400" />
                                <span className="terminal-dot bg-green-400" />
                                <span className="ml-2 text-xs text-terminal-text">
                                    user@portfolio: ~$
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="ml-auto text-terminal-muted hover:text-terminal-accent"
                                    aria-label="Close command palette"
                                >
                                    <HiX className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Log */}
                            <div
                                ref={logRef}
                                className="h-72 overflow-y-auto px-3 py-3 font-mono text-sm leading-6"
                            >
                                {history.map((line, i) =>
                                    line.type === 'in' ? (
                                        <p key={i} className="text-terminal-text">
                                            <span className="text-terminal-green">$</span>{' '}
                                            {line.text}
                                        </p>
                                    ) : (
                                        <p key={i} className="whitespace-pre-wrap text-terminal-text/80">
                                            {line.text}
                                        </p>
                                    )
                                )}
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={submit}
                                className="flex items-center gap-2 border-t border-terminal-border px-3 py-2"
                            >
                                <span className="text-terminal-green">$</span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    autoComplete="off"
                                    spellCheck="false"
                                    aria-label="Terminal command input"
                                    className="flex-1 bg-transparent font-mono text-sm text-terminal-green caret-terminal-accent focus:outline-none"
                                />
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default CommandPalette