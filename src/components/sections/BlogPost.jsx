import React from 'react'
import { motion } from 'framer-motion'
import { HiCalendar, HiClock, HiArrowLeft, HiShare, HiBookmark } from 'react-icons/hi'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import ScrollToTop from '../ui/ScrollToTop'
import ReadingProgress from '../ui/ReadingProgress'

const BlogPost = ({ post, onBack }) => {
    if (!post) return null

    const fullContent = {
        1: `
            Three.js has revolutionized the way we think about web experiences. In this comprehensive guide, we will explore how to integrate Three.js with React using React Three Fiber, creating stunning 3D visualizations that captivate users and elevate your web projects to new heights.

            ## Getting Started with Three.js

            Three.js is a powerful JavaScript library that makes WebGL accessible to everyone. It provides a high-level API for creating and displaying 3D graphics in the browser without having to deal with the complexities of raw WebGL.

            When combined with React through React Three Fiber, you get a declarative way to build 3D scenes using familiar React patterns. This means you can use components, hooks, and the entire React ecosystem while working with 3D graphics.

            ## Setting Up Your Environment

            First, install the necessary dependencies:

            \`\`\`bash
            npm install three @react-three/fiber @react-three/drei
            \`\`\`

            The \`@react-three/drei\` package provides helpful abstractions for common Three.js patterns, making it easier to add lights, cameras, controls, and more.

            ## Creating Your First 3D Scene

            A basic Three.js scene in React looks like this:

            \`\`\`jsx
            import { Canvas } from '@react-three/fiber'
            import { OrbitControls } from '@react-three/drei'

            function Scene() {
                return (
                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <mesh>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color="orange" />
                        </mesh>
                        <OrbitControls />
                    </Canvas>
                )
            }
            \`\`\`

            ## Performance Optimization Tips

            When working with 3D on the web, performance is crucial. Here are some key strategies:

            1. **Use instancing** for repeated geometries
            2. **Implement level of detail (LOD)** for complex models
            3. **Optimize textures** - use compressed formats when possible
            4. **Lazy load** 3D components when they enter the viewport
            5. **Use \`useMemo\`** for expensive calculations

            ## Conclusion

            Three.js and React Three Fiber open up incredible possibilities for web development. By combining the power of 3D graphics with React's component model, you can create truly immersive experiences that stand out from the crowd.
        `,
        2: `
            Animation libraries have become essential tools for modern web development. Framer Motion and GSAP are two of the most popular choices, each with its own strengths and use cases. Understanding when to use each can significantly impact your project performance and user experience.

            ## Framer Motion: The React Way

            Framer Motion is built specifically for React. It provides a declarative API that feels natural in React applications. With features like layout animations, gesture support, and AnimatePresence for exit animations, it's incredibly powerful for UI animations.

            **Best for:**
            - UI component animations
            - Page transitions
            - Gesture-based interactions
            - Layout animations
            - React-specific features

            ## GSAP: The Animation Powerhouse

            GSAP (GreenSock Animation Platform) is framework-agnostic and incredibly powerful. It excels at complex, timeline-based animations and offers unmatched performance, especially for heavy animation workloads.

            **Best for:**
            - Complex timeline animations
            - Scroll-triggered animations
            - SVG animations
            - Performance-critical animations
            - Framework-agnostic projects

            ## Performance Comparison

            Both libraries are highly optimized, but there are differences:

            - **GSAP** often wins in raw performance for complex animations
            - **Framer Motion** has less overhead for simple React animations
            - Both support hardware acceleration and RAF (requestAnimationFrame)

            ## Making the Right Choice

            Choose **Framer Motion** when:
            - Working primarily with React
            - Need declarative, component-based animations
            - Want built-in gesture support
            - Need layout animations

            Choose **GSAP** when:
            - Need maximum performance
            - Working with complex timelines
            - Need framework flexibility
            - Doing heavy SVG or canvas work

            ## Conclusion

            Both libraries are excellent choices. The best one depends on your specific needs. Many projects successfully use both - Framer Motion for UI animations and GSAP for complex timeline work.
        `,
        3: `
            Tailwind CSS has transformed how developers approach styling. Beyond the basics, there are powerful techniques that can help you build more maintainable and efficient stylesheets. Let us explore advanced patterns, custom plugins, and optimization strategies.

            ## Custom Design Tokens

            While Tailwind provides excellent defaults, customizing your design tokens makes your project unique:

            \`\`\`javascript
            // tailwind.config.js
            module.exports = {
                theme: {
                    extend: {
                        colors: {
                            brand: {
                                50: '#f0f9ff',
                                500: '#3b82f6',
                                900: '#1e3a8a',
                            }
                        }
                    }
                }
            }
            \`\`\`

            ## @apply for Component Classes

            The \`@apply\` directive lets you compose utility classes:

            \`\`\`css
            .btn-primary {
                @apply px-4 py-2 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 transition-colors duration-200;
            }
            \`\`\`

            ## Custom Plugins

            Extend Tailwind with custom plugins for repetitive patterns:

            \`\`\`javascript
            const plugin = require('tailwindcss/plugin')

            module.exports = {
                plugins: [
                    plugin(function({ addUtilities }) {
                        addUtilities({
                            '.text-shadow': {
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            }
                        })
                    })
                ]
            }
            \`\`\`

            ## Responsive Design Patterns

            Master responsive design with Tailwind:

            - Mobile-first approach (default → sm → md → lg)
            - Container queries for component-level responsiveness
            - Arbitrary values for one-off responsive needs

            ## Performance Optimization

            1. **Purge unused CSS** - Tailwind does this automatically
            2. **Use JIT mode** - Just-in-time compilation
            3. **Minimize arbitrary values** - Use theme tokens when possible
            4. **Leverage content configuration** - Ensure all files are scanned

            ## Conclusion

            Tailwind CSS is more than just utility classes. With advanced techniques, you can build sophisticated, maintainable design systems that scale with your project.
        `,
        4: `
            Performance optimization is crucial for React applications. From code splitting and lazy loading to memoization and virtual scrolling, there are numerous techniques to ensure your app runs smoothly even as it grows in complexity.

            ## Code Splitting

            Break your bundle into smaller chunks that load on demand:

            \`\`\`javascript
            const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

            function App() {
                return (
                    <Suspense fallback={<Loading />}>
                        <HeavyComponent />
                    </Suspense>
                )
            }
            \`\`\`

            ## Memoization Strategies

            Use \`useMemo\` and \`useCallback\` wisely:

            \`\`\`javascript
            // Memoize expensive calculations
            const expensiveValue = useMemo(() => {
                return heavyComputation(data)
            }, [data])

            // Memoize callbacks for child components
            const handleClick = useCallback(() => {
                doSomething(id)
            }, [id])
            \`\`\`

            ## Virtual Scrolling

            For long lists, only render visible items:

            \`\`\`javascript
            import { FixedSizeList } from 'react-window'

            function LargeList({ items }) {
                return (
                    <FixedSizeList
                        height={600}
                        itemCount={items.length}
                        itemSize={50}
                    >
                        {Row}
                    </FixedSizeList>
                )
            }
            \`\`\`

            ## Image Optimization

            - Use modern formats (WebP, AVIF)
            - Implement lazy loading
            - Serve responsive images
            - Use CDN for delivery

            ## Bundle Analysis

            Use tools to understand your bundle:

            \`\`\`bash
            npm install --save-dev webpack-bundle-analyzer
            npm run build -- --analyze
            \`\`\`

            ## Conclusion

            Performance optimization is an ongoing process. Regular profiling, testing, and incremental improvements will keep your React app fast and responsive.
        `,
        5: `
            Dark mode has become a standard feature users expect. Implementing it well requires careful consideration of contrast ratios, color choices, and transitions. Learn the principles that make dark mode both beautiful and accessible.

            ## Understanding Color Contrast

            WCAG guidelines recommend:
            - **4.5:1** contrast ratio for normal text
            - **3:1** contrast ratio for large text
            - **3:1** contrast ratio for UI components

            ## CSS Custom Properties

            Use CSS variables for seamless theme switching:

            \`\`\`css
            :root {
                --bg-primary: #ffffff;
                --bg-secondary: #f3f4f6;
                --text-primary: #111827;
                --text-secondary: #6b7280;
            }

            .dark {
                --bg-primary: #111827;
                --bg-secondary: #1f2937;
                --text-primary: #f9fafb;
                --text-secondary: #9ca3af;
            }
            \`\`\`

            ## Smooth Transitions

            Animate theme changes for better UX:

            \`\`\`css
            * {
                transition: background-color 0.3s ease,
                            color 0.3s ease,
                            border-color 0.3s ease;
            }
            \`\`\`

            ## System Preference Detection

            Respect user's OS settings:

            \`\`\`javascript
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
            \`\`\`

            ## Common Pitfalls

            1. **Pure black backgrounds** - Use dark grays instead
            2. **Saturated colors** - Reduce saturation in dark mode
            3. **Ignoring images** - Add dark variants for illustrations
            4. **Forgetting form elements** - Style all inputs consistently

            ## Conclusion

            Good dark mode implementation enhances user experience and accessibility. Take time to test thoroughly across different devices and lighting conditions.
        `,
        6: `
            The state management landscape has evolved significantly. While Redux remains popular, newer solutions like Zustand, Jotai, and React Query offer simpler APIs for different use cases. Understanding these options helps you choose the right tool for your project.

            ## Redux: The Established Choice

            Redux has been around since 2015 and remains a solid choice for complex applications:

            **Pros:**
            - Predictable state updates
            - Excellent DevTools
            - Large ecosystem
            - Well-documented

            **Cons:**
            - Boilerplate code
            - Steeper learning curve
            - Can be overkill for simple apps

            ## Zustand: Simplicity First

            Zustand provides a minimal, hook-based API:

            \`\`\`javascript
            import create from 'zustand'

            const useStore = create((set) => ({
                count: 0,
                increment: () => set((state) => ({ 
                    count: state.count + 1 
                })),
            }))
            \`\`\`

            ## Jotai: Atomic State

            Jotai uses atoms for granular state management:

            \`\`\`javascript
            import { atom, useAtom } from 'jotai'

            const countAtom = atom(0)

            function Counter() {
                const [count, setCount] = useAtom(countAtom)
                return <button onClick={() => setCount(c => c + 1)} />
            }
            \`\`\`

            ## React Query: Server State

            For server state, React Query is unmatched:

            \`\`\`javascript
            const { data, isLoading } = useQuery({
                queryKey: ['todos'],
                queryFn: fetchTodos,
            })
            \`\`\`

            ## Choosing the Right Tool

            - **Simple local state:** useState or Zustand
            - **Complex client state:** Redux Toolkit
            - **Atomic updates:** Jotai or Recoil
            - **Server state:** React Query or SWR

            ## Conclusion

            There's no one-size-fits-all solution. Choose based on your app's complexity, team experience, and specific requirements.
        `
    }

    const content = fullContent[post.id] || post.content

    return (
        <>
            <ReadingProgress />
            <div className="terminal-titlebar" aria-hidden="true">
                <div className="flex items-center gap-2">
                    <span className="terminal-dot bg-red-500" />
                    <span className="terminal-dot bg-yellow-400" />
                    <span className="terminal-dot bg-green-400" />
                </div>
                <span className="truncate text-xs text-terminal-text sm:text-sm">
                    user@portfolio: ~/blog/article$
                </span>
                <span className="terminal-cursor ml-auto hidden sm:inline-block">_</span>
            </div>
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-terminal-bg pt-20 pb-24"
            >
                {/* Header Image */}
                <div className="relative h-[360px] overflow-hidden border-y border-terminal-border">
                    <img
                        src={post.image}
                        alt={post.title}
                        decoding="async"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-terminal-green/10 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-terminal-bg/55 to-transparent" />

                    {/* Back Button */}
                    <button
                        onClick={onBack}
                        className="absolute top-8 left-8 flex items-center gap-2 border border-terminal-border bg-terminal-bg/80 px-4 py-2 text-terminal-green backdrop-blur-sm transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                        Back to Blog
                    </button>
                </div>

                {/* Content */}
                <div className="container-custom -mt-32 relative z-10">
                    <article className="max-w-3xl mx-auto">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="border border-terminal-accent bg-terminal-bg px-3 py-1 text-sm font-medium text-terminal-accent">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-terminal-muted">
                                <HiCalendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-terminal-muted">
                                <HiClock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>

                        {/* Title */}
                        <p className="terminal-command mb-4">cat article.md</p>
                        <h1 className="terminal-heading mb-8 text-3xl leading-tight md:text-5xl">
                            {post.title}
                        </h1>

                        {/* Author */}
                        <div className="mb-8 flex items-center gap-4 border-b border-terminal-border pb-8">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                                alt="Author"
                                loading="lazy"
                                decoding="async"
                                className="h-12 w-12 border border-terminal-border object-cover grayscale"
                            />
                            <div>
                                <p className="font-medium text-terminal-green">Phan Tiến Đạt</p>
                                <p className="text-sm text-terminal-muted">
                                    Creative Developer & Designer
                                </p>
                            </div>
                            <div className="ml-auto flex gap-2">
                                <button className="border border-terminal-border bg-terminal-surface p-2 text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent">
                                    <HiShare className="w-5 h-5" />
                                </button>
                                <button className="border border-terminal-border bg-terminal-surface p-2 text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent">
                                    <HiBookmark className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="max-w-none text-terminal-text">
                            {content.split('\n').map((paragraph, index) => {
                                const trimmed = paragraph.trim()
                                if (!trimmed) return null

                                if (trimmed.startsWith('##')) {
                                    return (
                                        <h2
                                            key={index}
                                            className="terminal-heading mt-12 mb-4 text-2xl"
                                        >
                                            {trimmed.replace('##', '').trim()}
                                        </h2>
                                    )
                                }

                                if (trimmed.startsWith('```')) {
                                    return null // Skip code block markers for now
                                }

                                if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                                    return (
                                        <li key={index} className="mb-2 ml-4 text-terminal-text/80">
                                            {trimmed.replace(/^[-*]\s*/, '')}
                                        </li>
                                    )
                                }

                                if (trimmed.match(/^\d+\./)) {
                                    return (
                                        <li
                                            key={index}
                                            className="mb-2 ml-4 list-decimal text-terminal-text/80"
                                        >
                                            {trimmed.replace(/^\d+\.\s*/, '')}
                                        </li>
                                    )
                                }

                                return (
                                    <p
                                        key={index}
                                        className="mb-6 leading-relaxed text-terminal-text/80"
                                    >
                                        {trimmed}
                                    </p>
                                )
                            })}
                        </div>

                        {/* Tags */}
                        <div className="mt-12 border-t border-terminal-border pt-8">
                            <p className="mb-4 text-sm text-terminal-muted">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'JavaScript', 'Web Development', 'Tutorial'].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="cursor-pointer border border-terminal-border bg-terminal-surface px-3 py-1 text-sm text-terminal-text/70 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Share */}
                        <div className="mt-8 p-6 glass-card">
                            <p className="mb-4 font-medium text-terminal-green">
                                Enjoyed this article?
                            </p>
                            <div className="flex gap-4">
                                <button className="btn-primary">Share on Twitter</button>
                                <button className="btn-outline">Subscribe for More</button>
                            </div>
                        </div>
                    </article>
                </div>
            </motion.div>

            <Footer />
            <ScrollToTop />
        </>
    )
}

export default BlogPost
