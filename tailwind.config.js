/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                terminal: {
                    bg: '#0a0a0a',
                    panel: '#0d0d0d',
                    surface: '#111111',
                    green: '#00ff41',
                    muted: '#888888',
                    text: '#e0e0e0',
                    accent: '#ffb000',
                    border: 'rgba(0,255,65,0.3)'
                },
                dark: {
                    50: '#f7fff9',
                    100: '#d8ffe2',
                    200: '#aaffbf',
                    300: '#70ff8f',
                    400: '#33ff5f',
                    500: '#00ff41',
                    600: '#00c933',
                    700: '#009427',
                    800: '#111111',
                    900: '#0d0d0d',
                    950: '#0a0a0a'
                },
                accent: {
                    primary: '#00ff41',
                    secondary: '#ffb000',
                    tertiary: '#ffb000',
                    glow: '#33ff33'
                }
            },
            fontFamily: {
                sans: ['"Fira Code"', '"JetBrains Mono"', 'Consolas', 'monospace'],
                display: ['"Fira Code"', '"JetBrains Mono"', 'Consolas', 'monospace'],
                mono: ['"Fira Code"', '"JetBrains Mono"', 'Consolas', 'monospace']
            },
            animation: {
                gradient: 'gradient 8s linear infinite',
                float: 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite'
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                pulseGlow: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 }
                }
            },
            backdropBlur: {
                xs: '2px'
            }
        }
    },
    plugins: []
}
