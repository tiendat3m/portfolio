import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCalendar, HiClock, HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const defaultPosts = [
    {
        id: 1,
        title: 'Building Immersive 3D Web Experiences with Three.js',
        excerpt: 'Learn how to create stunning 3D visualizations for the web using Three.js and React Three Fiber.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        category: 'Development',
        date: 'Mar 15, 2026',
        readTime: '8 min read',
        content: `Three.js has revolutionized the way we think about web experiences. In this comprehensive guide, we will explore how to integrate Three.js with React using React Three Fiber, creating stunning 3D visualizations that captivate users and elevate your web projects to new heights.

## Getting Started with Three.js

Three.js is a powerful JavaScript library that makes WebGL accessible to everyone. It provides a high-level API for creating and displaying 3D graphics in the browser without having to deal with the complexities of raw WebGL.

When combined with React through React Three Fiber, you get a declarative way to build 3D scenes using familiar React patterns. This means you can use components, hooks, and the entire React ecosystem while working with 3D graphics.

## Setting Up Your Environment

First, install the necessary dependencies:

npm install three @react-three/fiber @react-three/drei

The @react-three/drei package provides helpful abstractions for common Three.js patterns, making it easier to add lights, cameras, controls, and more.

## Creating Your First 3D Scene

A basic Three.js scene in React uses a Canvas component as the container. Inside, you can add meshes, lights, and controls to create your 3D environment.

## Performance Optimization Tips

When working with 3D on the web, performance is crucial:

1. Use instancing for repeated geometries
2. Implement level of detail (LOD) for complex models
3. Optimize textures - use compressed formats when possible
4. Lazy load 3D components when they enter the viewport
5. Use useMemo for expensive calculations

## Conclusion

Three.js and React Three Fiber open up incredible possibilities for web development. By combining the power of 3D graphics with React's component model, you can create truly immersive experiences that stand out from the crowd.`
    },
    {
        id: 2,
        title: 'The Future of Web Animation: Framer Motion vs GSAP',
        excerpt: 'A deep dive comparison of two popular animation libraries and when to use each one.',
        image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800',
        category: 'Animation',
        date: 'Mar 10, 2026',
        readTime: '6 min read',
        content: `Animation libraries have become essential tools for modern web development. Framer Motion and GSAP are two of the most popular choices, each with its own strengths and use cases.

## Framer Motion: The React Way

Framer Motion is built specifically for React. It provides a declarative API that feels natural in React applications. With features like layout animations, gesture support, and AnimatePresence for exit animations, it's incredibly powerful for UI animations.

Best for:
- UI component animations
- Page transitions
- Gesture-based interactions
- Layout animations
- React-specific features

## GSAP: The Animation Powerhouse

GSAP (GreenSock Animation Platform) is framework-agnostic and incredibly powerful. It excels at complex, timeline-based animations and offers unmatched performance, especially for heavy animation workloads.

Best for:
- Complex timeline animations
- Scroll-triggered animations
- SVG animations
- Performance-critical animations
- Framework-agnostic projects

## Making the Right Choice

Choose Framer Motion when working primarily with React and needing declarative, component-based animations.

Choose GSAP when needing maximum performance and working with complex timelines.

## Conclusion

Both libraries are excellent choices. The best one depends on your specific needs.`
    },
    {
        id: 3,
        title: 'Mastering Tailwind CSS: Advanced Techniques',
        excerpt: 'Take your Tailwind CSS skills to the next level with these advanced tips and tricks.',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
        category: 'CSS',
        date: 'Mar 5, 2026',
        readTime: '10 min read',
        content: `Tailwind CSS has transformed how developers approach styling. Beyond the basics, there are powerful techniques that can help you build more maintainable and efficient stylesheets.

## Custom Design Tokens

While Tailwind provides excellent defaults, customizing your design tokens makes your project unique. Define your brand colors, spacing, and typography in the tailwind.config.js file.

## @apply for Component Classes

The @apply directive lets you compose utility classes into reusable component classes. This is useful for creating consistent button styles, card layouts, and other repeated patterns.

## Custom Plugins

Extend Tailwind with custom plugins for repetitive patterns that aren't covered by the default utilities.

## Responsive Design Patterns

Master responsive design with Tailwind's mobile-first approach. Use breakpoints strategically and consider container queries for component-level responsiveness.

## Conclusion

Tailwind CSS is more than just utility classes. With advanced techniques, you can build sophisticated, maintainable design systems.`
    },
    {
        id: 4,
        title: 'Optimizing React Performance: A Complete Guide',
        excerpt: 'Essential strategies for building fast, efficient React applications that scale.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        category: 'React',
        date: 'Feb 28, 2026',
        readTime: '12 min read',
        content: `Performance optimization is crucial for React applications. From code splitting and lazy loading to memoization and virtual scrolling, there are numerous techniques to ensure your app runs smoothly.

## Code Splitting

Break your bundle into smaller chunks that load on demand using React.lazy and Suspense. This reduces initial load time significantly.

## Memoization Strategies

Use useMemo and useCallback wisely to prevent unnecessary re-renders. Memoize expensive calculations and callbacks for child components.

## Virtual Scrolling

For long lists, implement virtual scrolling to only render visible items. This dramatically improves performance for large datasets.

## Image Optimization

Use modern formats like WebP, implement lazy loading, and serve responsive images from a CDN.

## Conclusion

Performance optimization is an ongoing process. Regular profiling and incremental improvements will keep your React app fast.`
    },
    {
        id: 5,
        title: 'Designing for Dark Mode: Best Practices',
        excerpt: 'How to implement beautiful dark mode themes that enhance user experience.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        category: 'Design',
        date: 'Feb 20, 2026',
        readTime: '7 min read',
        content: `Dark mode has become a standard feature users expect. Implementing it well requires careful consideration of contrast ratios, color choices, and transitions.

## Understanding Color Contrast

WCAG guidelines recommend 4.5:1 contrast ratio for normal text and 3:1 for large text. Ensure your dark mode meets these accessibility standards.

## CSS Custom Properties

Use CSS variables for seamless theme switching. Define colors in :root and override them in a .dark class.

## Smooth Transitions

Animate theme changes for better UX. Transition background colors, text colors, and border colors smoothly.

## System Preference Detection

Respect user's OS settings by detecting prefers-color-scheme and applying the appropriate theme automatically.

## Conclusion

Good dark mode implementation enhances user experience and accessibility.`
    },
    {
        id: 6,
        title: 'State Management in 2026: Beyond Redux',
        excerpt: 'Exploring modern state management solutions for React applications.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        category: 'Development',
        date: 'Feb 15, 2026',
        readTime: '9 min read',
        content: `The state management landscape has evolved significantly. While Redux remains popular, newer solutions like Zustand, Jotai, and React Query offer simpler APIs for different use cases.

## Redux: The Established Choice

Redux remains a solid choice for complex applications with predictable state updates, excellent DevTools, and a large ecosystem.

## Zustand: Simplicity First

Zustand provides a minimal, hook-based API that's perfect for simpler state management needs.

## Jotai: Atomic State

Jotai uses atoms for granular state management, allowing fine-grained updates and optimal performance.

## React Query: Server State

For server state, React Query is unmatched. It handles caching, background updates, and synchronization beautifully.

## Conclusion

There's no one-size-fits-all solution. Choose based on your app's complexity and specific requirements.`
    }
]

const Blog = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('blogPosts')
        return saved ? JSON.parse(saved) : defaultPosts
    })

    // Only show first 3 posts on homepage
    const previewPosts = posts.slice(0, 3)

    return (
        <>
            <section id='blog' className='section-padding relative'>
                <div className='container-custom'>
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className='text-center mb-16'
                    >
                        <p className='text-accent-glow text-sm font-medium tracking-[0.3em] uppercase mb-4'>
                            Blog
                        </p>
                        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                            Latest <span className='gradient-text'>Articles</span>
                        </h2>
                        <p className='text-white/60 max-w-2xl mx-auto'>
                            Thoughts on web development, design, and creative technology.
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {previewPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className='glass-card overflow-hidden group cursor-pointer'
                                whileHover={{ y: -10 }}
                            >
                                <Link to='/blog'>
                                    <div className='relative h-48 overflow-hidden'>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                        />
                                        <div className='absolute top-4 left-4'>
                                            <span className='px-3 py-1 bg-accent-primary/90 text-white text-xs font-medium rounded-full'>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='p-6'>
                                        <div className='flex items-center gap-4 text-white/50 text-sm mb-3'>
                                            <span className='flex items-center gap-1'>
                                                <HiCalendar className='w-4 h-4' />
                                                {post.date}
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <HiClock className='w-4 h-4' />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h3 className='text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-primary transition-colors'>
                                            {post.title}
                                        </h3>

                                        <p className='text-white/60 text-sm mb-4 line-clamp-2'>
                                            {post.excerpt}
                                        </p>

                                        <span className='flex items-center gap-2 text-accent-primary text-sm font-medium group-hover:gap-3 transition-all'>
                                            Read More <HiArrowRight className='w-4 h-4' />
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className='text-center mt-12'
                    >
                        <Link to='/blog' className='btn-outline'>
                            View All Articles
                        </Link>
                    </motion.div>
                </div>

                {/* Background decoration */}
                <div className='absolute top-1/3 left-0 w-80 h-80 bg-accent-tertiary/10 rounded-full blur-[120px]' />
            </section>
        </>
    )
}

export default Blog