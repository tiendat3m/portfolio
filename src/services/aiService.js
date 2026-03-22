// AI Chatbot Service - Multiple Free AI Providers
// Supported: OpenAI, Google Gemini, Hugging Face, Groq

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'gemini'

// OpenAI Configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo'

// Google Gemini Configuration (FREE - 60 requests/minute)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-pro'

// Hugging Face Configuration (FREE - 1000 requests/day)
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY
const HF_MODEL = import.meta.env.VITE_HF_MODEL || 'microsoft/DialoGPT-medium'

// Groq Configuration (FREE - Fast inference)
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant'

// Helper function to show toast notification
const showToast = (message, type = 'info') => {
    window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message, type }
    }))
}

// Portfolio context for AI
const PORTFOLIO_CONTEXT = `
You are a helpful AI assistant for a creative developer's portfolio website. Your name is "Portfolio AI Assistant".

## ABOUT THE DEVELOPER

**Name:** Phan Tiến Đạt (Creative Developer & Designer)
**Location:** Ho Chi Minh City, Vietnam
**Experience:** 3+ years in web development
**Email:** phantiendat14012002@gmail.com
**Phone:** 0343759130
**GitHub:** github.com/tiendat3m
**LinkedIn:** linkedin.com/in/tiendat3m
**X (Twitter):** x.com/APhan33064
**Instagram:** instagram.com/justdatt.3m

**Bio:**
A passionate creative developer who blends cutting-edge technology with stunning visual design. Specializes in building immersive web experiences that captivate users and elevate digital projects. With expertise in React, Three.js, and modern web technologies, I transform ideas into interactive realities.

## SKILLS & EXPERTISE

### Frontend Development
- React / Next.js (Expert - 95%)
- JavaScript / TypeScript (Expert - 90%)
- HTML5 / CSS3 (Expert - 95%)
- Tailwind CSS (Expert - 90%)
- Three.js / WebGL (Advanced - 80%)
- GSAP / Framer Motion (Advanced - 85%)

### Backend Development
- Node.js / Express (Advanced - 85%)
- Python / FastAPI (Advanced - 80%)
- RESTful APIs (Expert - 90%)
- GraphQL (Intermediate - 75%)
- WebSocket (Intermediate - 70%)
- Microservices (Intermediate - 75%)

### Database & DevOps
- PostgreSQL / MongoDB (Advanced - 85%)
- Redis (Intermediate - 75%)
- Docker / Kubernetes (Advanced - 80%)
- AWS / GCP (Intermediate - 75%)
- CI/CD (Advanced - 80%)
- Git / GitHub (Expert - 95%)

### Design & Tools
- Figma (Advanced - 85%)
- Adobe XD (Advanced - 80%)
- Photoshop (Intermediate - 75%)
- Blender 3D (Intermediate - 70%)
- UI/UX Design (Advanced - 85%)
- Responsive Design (Expert - 95%)

## SERVICES OFFERED

### 1. Web Development
- Custom Web Apps - Tailored solutions for unique business needs
- E-commerce Solutions - Online stores with payment integration
- CMS Development - Content management systems
- API Integration - Connect with third-party services

### 2. Mobile Development
- React Native Apps - Cross-platform mobile applications
- PWA Development - Progressive web apps
- App Optimization - Performance tuning
- Push Notifications - Real-time engagement

### 3. UI/UX Design
- User Research - Understanding user needs
- Wireframing - Layout and structure planning
- Prototyping - Interactive mockups
- Design Systems - Consistent component libraries

### 4. 3D & WebGL
- Three.js Development - Interactive 3D experiences
- WebGL Shaders - Custom visual effects
- 3D Product Views - E-commerce product visualization
- Interactive Graphics - Data visualization

### 5. Performance Optimization
- Core Web Vitals - Google's performance metrics
- Bundle Optimization - Reduce load times
- Caching Strategies - Improve response times
- SEO Enhancement - Better search rankings

### 6. Consulting & Strategy
- Tech Stack Selection - Choose the right tools
- Architecture Review - Evaluate existing systems
- Code Audits - Improve code quality
- Team Training - Knowledge transfer

## PORTFOLIO PROJECTS

### 1. Immersive 3D Dashboard
- Real-time data visualization with interactive 3D elements
- Technologies: React, Three.js, D3.js, GSAP
- Category: Web Development

### 2. E-Commerce Platform
- Modern e-commerce with AR product preview and AI recommendations
- Technologies: Next.js, Node.js, PostgreSQL, Stripe
- Category: Full Stack

### 3. Creative Agency Website
- Award-winning agency site with scroll-driven animations
- Technologies: React, Framer Motion, WebGL, Tailwind
- Category: Design & Development

### 4. AI Content Generator
- GPT-powered content creation tool with collaboration features
- Technologies: Python, OpenAI, React, FastAPI
- Category: AI/ML

## TESTIMONIALS

**Sarah Johnson (CEO, TechStart Inc.):**
"Working with this team was an absolute pleasure. They delivered a stunning website that exceeded our expectations. The attention to detail and creative solutions were impressive."

**Michael Chen (Product Manager, InnovateTech):**
"The 3D visualizations they created for our product launch were game-changing. Our engagement rates increased by 150% after implementing their interactive features."

**Emily Rodriguez (Marketing Director, BrandCo):**
"Exceptional design skills combined with technical expertise. They transformed our outdated website into a modern, high-performing platform that our customers love."

## STATS
- 3+ Years Experience
- 50+ Projects Completed
- 30+ Happy Clients
- 15+ Awards Won

## YOUR ROLE AS AI ASSISTANT

1. **Be helpful and informative** - Answer questions about skills, services, and experience
2. **Be professional** - Maintain a friendly yet professional tone
3. **Guide visitors** - Help them understand what services they need
4. **Encourage contact** - Suggest reaching out for detailed discussions
5. **Be concise** - Keep responses to 2-3 paragraphs, use bullet points when appropriate
6. **Use emojis** - Add occasional emojis to be friendly (but not too many)
7. **Speak Vietnamese or English** - Match the user's language

## RESPONSE GUIDELINES

- If asked about **pricing**: "For detailed pricing, please contact directly at phantiendat14012002@gmail.com or call 0343759130. Each project is unique and requires a custom quote."
- If asked about **availability**: "I'm currently available for new projects! Feel free to reach out to discuss your requirements."
- If asked about **timeline**: "Project timelines vary based on complexity. A typical website takes 2-4 weeks, while more complex applications may take 2-3 months."
- If asked about **technologies**: Provide specific recommendations based on project needs
- If asked about **past work**: Reference the portfolio projects listed above

## WHAT NOT TO DO

- Do not make up information not provided above
- Do not share personal/private information
- Do not provide specific fixed pricing
- Do not make promises about exact timelines
- Do not criticize other developers or companies
- Do not provide legal or financial advice
`

// Send message using OpenAI
const sendOpenAI = async (userMessage, conversationHistory) => {
    const messages = [
        { role: 'system', content: PORTFOLIO_CONTEXT },
        ...conversationHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
        })),
        { role: 'user', content: userMessage }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: OPENAI_MODEL,
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
        })
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'OpenAI API error')
    }

    const data = await response.json()
    return {
        message: data.choices[0]?.message?.content,
        usage: data.usage
    }
}

// Send message using Google Gemini (FREE!)
const sendGemini = async (userMessage, conversationHistory) => {
    // Build conversation context
    let conversationText = PORTFOLIO_CONTEXT + '\n\nConversation:\n'

    conversationHistory.forEach(msg => {
        conversationText += msg.type === 'user'
            ? `User: ${msg.content}\n`
            : `Assistant: ${msg.content}\n`
    })
    conversationText += `User: ${userMessage}\nAssistant:`

    // Try different model names in case one fails
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']
    let lastError = null

    for (const model of models) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: conversationText }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 500
                        }
                    })
                }
            )

            if (response.ok) {
                const data = await response.json()
                return {
                    message: data.candidates[0]?.content?.parts[0]?.text,
                    usage: data.usageMetadata,
                    model: model
                }
            }
            lastError = await response.json()
        } catch (error) {
            lastError = error
            continue
        }
    }

    throw new Error(lastError?.error?.message || 'All Gemini models failed')
}

// Send message using Hugging Face (FREE!)
const sendHuggingFace = async (userMessage, conversationHistory) => {
    // Build conversation
    let text = PORTFOLIO_CONTEXT + '\n\n'
    conversationHistory.forEach(msg => {
        text += msg.type === 'user' ? `Human: ${msg.content}\n` : `Assistant: ${msg.content}\n`
    })
    text += `Human: ${userMessage}\nAssistant:`

    const response = await fetch(
        `https://api-inference.huggingface.co/models/${HF_MODEL}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HF_API_KEY}`
            },
            body: JSON.stringify({
                inputs: text,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        }
    )

    if (!response.ok) {
        throw new Error('Hugging Face API error')
    }

    const data = await response.json()
    return {
        message: data[0]?.generated_text || 'Sorry, I could not process your request.',
        usage: null
    }
}

// Send message using Groq (FREE & FAST!)
const sendGroq = async (userMessage, conversationHistory) => {
    const messages = [
        { role: 'system', content: PORTFOLIO_CONTEXT },
        ...conversationHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
        })),
        { role: 'user', content: userMessage }
    ]

    // Try multiple Groq models
    const models = [
        'llama-3.1-8b-instant',
        'llama-3.1-70b-versatile',
        'mixtral-8x7b-32768',
        'gemma-7b-it'
    ]

    let lastError = null

    for (const model of models) {
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    max_tokens: 500,
                    temperature: 0.7
                })
            })

            if (response.ok) {
                const data = await response.json()
                return {
                    message: data.choices[0]?.message?.content,
                    usage: data.usage,
                    model: model
                }
            }
            lastError = await response.json()
        } catch (error) {
            lastError = error
            continue
        }
    }

    throw new Error(lastError?.error?.message || 'All Groq models failed')
}

// Main function to send message to AI
export const sendMessageToAI = async (userMessage, conversationHistory = []) => {
    try {
        let response

        switch (AI_PROVIDER) {
            case 'openai':
                if (!OPENAI_API_KEY) throw new Error('OpenAI API key not configured')
                response = await sendOpenAI(userMessage, conversationHistory)
                break

            case 'gemini':
                if (!GEMINI_API_KEY) throw new Error('Gemini API key not configured')
                response = await sendGemini(userMessage, conversationHistory)
                break

            case 'huggingface':
                if (!HF_API_KEY) throw new Error('Hugging Face API key not configured')
                response = await sendHuggingFace(userMessage, conversationHistory)
                break

            case 'groq':
                if (!GROQ_API_KEY) throw new Error('Groq API key not configured')
                response = await sendGroq(userMessage, conversationHistory)
                break

            default:
                throw new Error('Unknown AI provider')
        }

        return {
            success: true,
            message: response.message,
            usage: response.usage,
            provider: AI_PROVIDER
        }

    } catch (error) {
        console.error('AI Service Error:', error)

        // Provide fallback response based on keywords
        const fallbackResponse = getFallbackResponse(userMessage)

        return {
            success: false,
            message: fallbackResponse,
            error: error.message,
            fallback: true
        }
    }
}

// Fallback responses when AI is not available
const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('giá') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return '💰 Về giá cả, tôi khuyên bạn nên liên hệ trực tiếp để được tư vấn chi tiết. Mỗi dự án có yêu cầu khác nhau nên giá cũng sẽ khác nhau. Bạn có thể gửi email đến phantiendat14012002@gmail.com hoặc gọi 0343759130 nhé!'
    }

    if (lowerMessage.includes('dịch vụ') || lowerMessage.includes('service')) {
        return '🛠️ Các dịch vụ chính bao gồm:\n\n• Web Development - Xây dựng website chuyên nghiệp\n• Mobile Development - Ứng dụng di động\n• UI/UX Design - Thiết kế giao diện\n• 3D/WebGL - Trải nghiệm 3D tương tác\n• Performance Optimization - Tối ưu hiệu suất\n• Consulting - Tư vấn kỹ thuật\n\nBạn muốn tìm hiểu thêm về dịch vụ nào?'
    }

    if (lowerMessage.includes('công nghệ') || lowerMessage.includes('tech') || lowerMessage.includes('skill')) {
        return '💻 Các công nghệ chính:\n\n**Frontend:** React, Next.js, Three.js, Framer Motion, GSAP, Tailwind CSS\n**Backend:** Node.js, Python, Express\n**Database:** PostgreSQL, MongoDB\n**Other:** Docker, AWS, Git\n\nVới hơn 3 năm kinh nghiệm, tôi có thể đáp ứng nhiều loại dự án khác nhau!'
    }

    if (lowerMessage.includes('liên hệ') || lowerMessage.includes('contact')) {
        return '📬 Bạn có thể liên hệ qua:\n\n• Email: phantiendat14012002@gmail.com\n• Phone: 0343759130\n• Zalo: 0343759130\n• Location: Ho Chi Minh City, Vietnam\n\nHoặc điền form liên hệ trên website, tôi sẽ phản hồi sớm nhất có thể!'
    }

    if (lowerMessage.includes('kinh nghiệm') || lowerMessage.includes('experience')) {
        return '👨‍💻 Tôi có hơn 3 năm kinh nghiệm trong lĩnh vực phát triển web, chuyên về:\n\n• Xây dựng website và ứng dụng web\n• Phát triển giao diện tương tác 3D\n• Tối ưu hiệu suất và trải nghiệm người dùng\n• Tư vấn giải pháp kỹ thuật\n\nĐã làm việc với nhiều khách hàng từ startup đến doanh nghiệp!'
    }

    return '🤖 Xin lỗi, trợ lý AI tạm thời không khả dụng. Tuy nhiên, tôi vẫn có thể giúp bạn!\n\nVui lòng liên hệ trực tiếp:\n• Email: phantiendat14012002@gmail.com\n• Phone: 0343759130\n• Zalo: 0343759130\n\nHoặc để lại tin nhắn trong form liên hệ, tôi sẽ phản hồi sớm nhất!'
}

// Check if AI is configured
export const isAIConfigured = () => {
    switch (AI_PROVIDER) {
        case 'openai':
            return OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')
        case 'gemini':
            return GEMINI_API_KEY && GEMINI_API_KEY.length > 0
        case 'huggingface':
            return HF_API_KEY && HF_API_KEY.startsWith('hf_')
        case 'groq':
            return GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_')
        default:
            return false
    }
}

// Get AI status
export const getAIStatus = () => {
    const configured = isAIConfigured()
    const providerNames = {
        openai: 'OpenAI GPT',
        gemini: 'Google Gemini',
        huggingface: 'Hugging Face',
        groq: 'Groq'
    }

    if (configured) {
        return {
            configured: true,
            message: `AI assistant powered by ${providerNames[AI_PROVIDER]}`,
            provider: AI_PROVIDER
        }
    }
    return {
        configured: false,
        message: 'AI assistant is not configured. Using fallback responses.'
    }
}

export default {
    sendMessageToAI,
    isAIConfigured,
    getAIStatus
}