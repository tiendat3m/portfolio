import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Pages
import BlogPage from './pages/BlogPage'
import NotFound from './components/pages/NotFound'

// UI
import CustomCursor from './components/ui/CustomCursor'
import NoiseOverlay from './components/ui/NoiseOverlay'
import PageLoader from './components/ui/PageLoader'
import ScrollToTop from './components/ui/ScrollToTop'
import ThemeToggle from './components/ui/ThemeToggle'
import LiveChat from './components/ui/LiveChat'

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
        // Simulate loading time for smooth entrance
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isLoading && mainRef.current) {
            // Initialize smooth scroll and parallax effects
            const ctx = gsap.context(() => {
                // Parallax effect for sections
                gsap.utils.toArray('.parallax-section').forEach((section) => {
                    gsap.to(section, {
                        yPercent: -10,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    })
                })

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

                // 3D rotation on scroll for cards
                gsap.utils.toArray('.glass-card').forEach((card) => {
                    gsap.fromTo(card,
                        { rotateY: -5, rotateX: 5 },
                        {
                            rotateY: 5,
                            rotateX: -5,
                            duration: 2,
                            ease: 'power2.inOut',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1
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
                <div ref={mainRef} className="relative">
                    <CustomCursor />
                    <NoiseOverlay />
                    <ThemeToggle />

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

                    {/* Gradient overlays for depth */}
                    <div className="fixed inset-0 pointer-events-none z-50">
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-950 to-transparent opacity-50" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent opacity-50" />
                    </div>

                    <ScrollToTop />
                    <LiveChat />
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
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App