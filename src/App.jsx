import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AuthProvider } from './context/AuthContext'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Testimonials from './components/sections/Testimonials'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'

// UI
import NoiseOverlay from './components/ui/NoiseOverlay'
import PageLoader from './components/ui/PageLoader'
import ScrollToTop from './components/ui/ScrollToTop'
import ThemeToggle from './components/ui/ThemeToggle'

const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const NotFound = lazy(() => import('./components/pages/NotFound'))
const LiveChat = lazy(() => import('./components/ui/LiveChat'))

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Scroll to top on route change
const ScrollToTopOnRoute = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [pathname])

    return null
}

// Home Page Component
const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const mainRef = useRef(null)

    useEffect(() => {
        // Keep the entrance lightweight so slower/60Hz displays feel responsive.
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            return undefined
        }

        if (!isLoading && mainRef.current) {
            // Initialize lightweight scroll reveal effects.
            const ctx = gsap.context(() => {
                // Fade in sections on scroll
                gsap.utils.toArray('.fade-in-section').forEach((section) => {
                    gsap.fromTo(
                        section,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 80%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    )
                })
            }, mainRef)

            return () => ctx.revert()
        }
    }, [isLoading])

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <PageLoader key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <div
                    ref={mainRef}
                    className="relative min-h-screen bg-terminal-bg px-0 py-0 sm:px-2 sm:py-2"
                >
                    <NoiseOverlay />
                    <ThemeToggle />

                    <div className="terminal-window">
                        <div className="terminal-titlebar" aria-hidden="true">
                            <div className="flex items-center gap-2">
                                <span className="terminal-dot bg-red-500" />
                                <span className="terminal-dot bg-yellow-400" />
                                <span className="terminal-dot bg-green-400" />
                            </div>
                            <span className="truncate text-xs text-terminal-text sm:text-sm">
                                user@portfolio: ~$
                            </span>
                            <span className="terminal-cursor ml-auto hidden sm:inline-block">
                                _
                            </span>
                        </div>

                        <Navbar />

                        <main className="relative">
                            <Hero />
                            <About />
                            <Skills />
                            <Services />
                            <Projects />
                            <Experience />
                            <Testimonials />
                            <Blog />
                            <Contact />
                        </main>

                        <Footer />
                    </div>

                    <div className="fixed inset-0 pointer-events-none z-50">
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-terminal-bg to-transparent opacity-70" />
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-terminal-bg to-transparent opacity-70" />
                    </div>

                    <ScrollToTop />

                    <Suspense fallback={null}>
                        <LiveChat />
                    </Suspense>
                </div>
            )}
        </>
    )
}

// Main App Component with Routing
function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTopOnRoute />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:id" element={<BlogPostPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    )
}

export default App
