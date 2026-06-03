export const DEFAULT_POSTS = [
    {
        id: 1,
        title: 'Building Immersive 3D Web Experiences with Three.js',
        excerpt:
            'Learn how to create stunning 3D visualizations for the web using Three.js and React Three Fiber.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        category: 'Development',
        date: 'Mar 15, 2026',
        readTime: '8 min read',
        author: 'Admin',
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
        excerpt:
            'A deep dive comparison of two popular animation libraries and when to use each one.',
        image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800',
        category: 'Animation',
        date: 'Mar 10, 2026',
        readTime: '6 min read',
        author: 'Admin',
        content: `Animation libraries have become essential tools for modern web development. Framer Motion and GSAP are two of the most popular choices, each with its own strengths and use cases.

## Framer Motion: The React Way

Framer Motion is built specifically for React. It provides a declarative API that feels natural in React applications.

Best for:
- UI component animations
- Page transitions
- Gesture-based interactions
- Layout animations
- React-specific features

## GSAP: The Animation Powerhouse

GSAP (GreenSock Animation Platform) is framework-agnostic and incredibly powerful.

Best for:
- Complex timeline animations
- Scroll-triggered animations
- SVG animations
- Performance-critical animations
- Framework-agnostic projects

## Conclusion

Both libraries are excellent choices. The best one depends on your specific needs.`
    },
    {
        id: 3,
        title: 'Mastering Tailwind CSS: Advanced Techniques',
        excerpt:
            'Take your Tailwind CSS skills to the next level with these advanced tips and tricks.',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
        category: 'CSS',
        date: 'Mar 5, 2026',
        readTime: '10 min read',
        author: 'Admin',
        content: `Tailwind CSS has transformed how developers approach styling. Beyond the basics, there are powerful techniques that can help you build more maintainable and efficient stylesheets.

## Custom Design Tokens

While Tailwind provides excellent defaults, customizing your design tokens makes your project unique.

## @apply for Component Classes

The @apply directive lets you compose utility classes into reusable component classes.

## Custom Plugins

Extend Tailwind with custom plugins for repetitive patterns.

## Conclusion

With advanced techniques, you can build sophisticated, maintainable design systems.`
    }
]

export const getStoredBlogPosts = () => {
    try {
        const savedPosts = localStorage.getItem('blogPosts')
        return savedPosts ? JSON.parse(savedPosts) : DEFAULT_POSTS
    } catch {
        return DEFAULT_POSTS
    }
}