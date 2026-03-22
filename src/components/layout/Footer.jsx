import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { HiArrowUp } from 'react-icons/hi'

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaDribbble, href: 'https://dribbble.com', label: 'Dribbble' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' }
]

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative py-16 border-t border-white/5">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent pointer-events-none" />

            <div className="container-custom relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <motion.a
                            href="#"
                            className="text-2xl font-bold gradient-text"
                            whileHover={{ scale: 1.05 }}
                        >
                            Portfolio
                        </motion.a>
                        <p className="text-white/40 text-sm mt-2">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                aria-label={social.label}
                            >
                                <social.icon className="w-4 h-4" />
                            </motion.a>
                        ))}

                        {/* Resume Download */}
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-accent-primary/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <HiDownload className="w-4 h-4" />
                            Resume
                        </motion.a>
                    </div>

                    {/* Back to Top */}
                    <motion.button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                        whileHover={{ y: -2 }}
                    >
                        <span className="text-sm">Back to top</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-primary/20 group-hover:border-accent-primary/50 transition-all duration-300">
                            <HiArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                    </motion.button>
                </div>

                {/* Bottom line */}
                <motion.div
                    className="mt-12 pt-8 border-t border-white/5 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-white/30 text-sm">
                        Designed & Built with{' '}
                        <span className="text-accent-tertiary">♥</span>{' '}
                        using React & Three.js
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer