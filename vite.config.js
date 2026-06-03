import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // Base path - change to '/your-repo-name/' if deploying to GitHub Pages subdirectory
    // Keep as '/' for root domain deployment (Vercel, Netlify, custom domain)
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) {
                        return undefined
                    }

                    if (id.includes('framer-motion') || id.includes('gsap')) {
                        return 'animations'
                    }

                    if (id.includes('@supabase')) {
                        return 'supabase'
                    }

                    if (id.includes('react-icons')) {
                        return 'icons'
                    }

                    if (
                        id.includes('react-router-dom') ||
                        id.includes('/react/') ||
                        id.includes('/react-dom/')
                    ) {
                        return 'vendor'
                    }

                    return undefined
                }
            }
        }
    },
    server: {
        host: true,
        port: 5173,
        // Enable SPA fallback for client-side routing
        historyApiFallback: true
    },
    preview: {
        port: 4173
    }
})
