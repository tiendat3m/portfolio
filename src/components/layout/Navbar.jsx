import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
    { name: 'About', href: '#about', type: 'hash' },
    { name: 'Skills', href: '#skills', type: 'hash' },
    { name: 'Services', href: '#services', type: 'hash' },
    { name: 'Projects', href: '#projects', type: 'hash' },
    { name: 'Experience', href: '#experience', type: 'hash' },
    { name: 'Testimonials', href: '#testimonials', type: 'hash' },
    { name: 'Blog', href: '/blog', type: 'route' },
    { name: 'Contact', href: '#contact', type: 'hash' }
]

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    // Handle scroll for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navLinks
                .filter(link => link.type === 'hash')
                .map(link => link.href.substring(1))

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle hash navigation when location changes
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash)
            if (element) {
                // Small delay to ensure page is ready
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        } else if (location.pathname === '/') {
            // If on home page with no hash, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [location])

    const handleNavClick = (e, link) => {
        e.preventDefault()
        setIsMobileMenuOpen(false)

        if (link.type === 'route') {
            // Navigate to route (e.g., /blog)
            navigate(link.href)
        } else {
            // Hash link - scroll to section
            if (location.pathname !== '/') {
                // Not on home page - navigate to home with hash
                navigate('/' + link.href)
            } else {
                // Already on home page - just scroll
                const element = document.querySelector(link.href)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }
        }
    }

    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname !== '/') {
            navigate('/')
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const renderNavLink = (link, index, isMobile = false) => {
        const isActive = link.type === 'hash' && activeSection === link.href.substring(1)
        const isCurrentRoute = link.type === 'route' && location.pathname === link.href

        if (link.type === 'route') {
            return (
                <Link
                    key={link.name}
                    to={link.href}
                    className={isMobile
                        ? `text-3xl font-bold py-4 ${isCurrentRoute ? 'text-white' : 'text-white/80 hover:text-white'}`
                        : `relative text-sm font-medium transition-colors duration-300 ${isCurrentRoute ? 'text-white' : 'text-white/60 hover:text-white'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {link.name}
                    {isCurrentRoute && !isMobile && (
                        <motion.div
                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"
                            layoutId="activeSection"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                    )}
                </Link>
            )
        }

        if (isMobile) {
            return (
                <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-3xl font-bold py-4 ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                >
                    {link.name}
                </motion.a>
            )
        }

        return (
            <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
            >
                {link.name}
                {isActive && (
                    <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"
                        layoutId="activeSection"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}
            </motion.a>
        )
    }

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                    ? 'py-4 bg-dark-950/80 backdrop-blur-xl border-b border-white/5'
                    : 'py-6 bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <nav className="container-custom flex items-center justify-between">
                    <motion.a
                        href="/"
                        onClick={handleLogoClick}
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-2xl font-bold gradient-text">Portfolio</span>
                        <motion.div
                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => renderNavLink(link, index))}

                        <motion.a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, { href: '#contact', type: 'hash' })}
                            className="btn-primary text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let's Talk
                        </motion.a>
                    </div>

                    <motion.button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiMenuAlt3 className="w-6 h-6" />
                        )}
                    </motion.button>
                </nav>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[99] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-dark-950/95 backdrop-blur-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="relative flex flex-col items-center justify-center h-full"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navLinks.map((link, index) => renderNavLink(link, index, true))}

                            <motion.a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, { href: '#contact', type: 'hash' })}
                                className="btn-primary mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Let's Talk
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar