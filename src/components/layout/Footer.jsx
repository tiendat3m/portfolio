import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { HiDownload, HiArrowUp } from 'react-icons/hi'

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/tiendat3m', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/tiendat3m/', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://x.com/APhan33064', label: 'X (Twitter)' },
    { icon: FaInstagram, href: 'https://www.instagram.com/justdatt.3m/', label: 'Instagram' }
]

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative border-t border-terminal-border py-12">
            <div className="container-custom relative">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <motion.a
                            href="#"
                            className="text-2xl font-medium text-terminal-accent"
                            whileHover={{ scale: 1.03 }}
                        >
                            Portfolio
                        </motion.a>
                        <p className="mt-2 text-sm text-terminal-muted">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-surface text-terminal-text/70 transition-all duration-200 hover:border-terminal-accent hover:text-terminal-accent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                                aria-label={social.label}
                            >
                                <social.icon className="h-4 w-4" />
                            </motion.a>
                        ))}

                        <motion.a
                            href="/resume.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary ml-0 flex items-center gap-2 sm:ml-2"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <HiDownload className="h-4 w-4" />
                            Resume
                        </motion.a>
                    </div>

                    <motion.button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-terminal-text/70 transition-colors duration-200 hover:text-terminal-accent"
                        whileHover={{ y: -2 }}
                    >
                        <span className="text-sm">Back to top</span>
                        <span className="flex h-8 w-8 items-center justify-center border border-terminal-border bg-terminal-surface transition-colors group-hover:border-terminal-accent">
                            <HiArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                        </span>
                    </motion.button>
                </div>

                <motion.div
                    className="mt-10 border-t border-terminal-border pt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm text-terminal-muted">
                        Process finished with exit code 0 — connection secure
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
