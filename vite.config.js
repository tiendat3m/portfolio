import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        // Enable SPA fallback for client-side routing
        historyApiFallback: true
    }
})