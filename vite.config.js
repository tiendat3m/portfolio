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
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    animations: ['framer-motion', 'gsap']
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
