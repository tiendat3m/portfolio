-- Seed bài blog AI với nội dung chi tiết hơn
-- Chạy file này trong Supabase SQL Editor sau khi đã có schema 001

INSERT INTO posts (title, excerpt, content, image, category, author, read_time) VALUES
(
  'AI Agents trong Frontend: Bắt đầu từ đâu?',
  'Tổng quan thực tế để tích hợp AI Agent vào web app mà không làm hệ thống phức tạp quá mức.',
  'AI Agent không chỉ là chatbot đơn thuần. Trong frontend hiện đại, AI Agent có thể đóng vai trò là trợ lý thông minh, hỗ trợ người dùng thực hiện các tác vụ phức tạp một cách tự nhiên.

## Khi nào nên dùng AI Agent trong Frontend?

Việc tích hợp AI Agent vào frontend cần được cân nhắc kỹ lưỡng. Dưới đây là những tình huống phù hợp nhất để triển khai:

**Có nhiều tác vụ lặp lại theo rule rõ ràng**: Khi ứng dụng của bạn có các quy trình nghiệp vụ lặp đi lặp lại, AI Agent có thể học pattern và tự động hóa việc hướng dẫn người dùng.

**Cần trải nghiệm tương tác tự nhiên hơn**: Thay vì các form phức tạp với nhiều bước, AI Agent có thể thu thập thông tin qua hội thoại tự nhiên.

**Muốn rút ngắn thời gian thao tác của user**: AI Agent có thể hiểu ngữ cảnh và đề xuất hành động tiếp theo, giảm số lần click cần thiết.

## Kiến trúc gợi ý cho AI Agent

Một kiến trúc đơn giản nhưng hiệu quả có thể được xây dựng theo mô hình sau:

```
Frontend (React) -> API Layer -> LLM Provider -> Tool Handlers
```

**Frontend Layer**: Xử lý UI state, hiển thị tin nhắn, quản lý session.

**API Layer**: Đóng vai trò middleware, xử lý authentication, rate limiting, và routing requests.

**LLM Provider**: Là "bộ não" của agent, xử lý ngôn ngữ tự nhiên và đưa ra quyết định.

**Tool Handlers**: Các hàm xử lý tác vụ cụ thể như tìm kiếm, đặt lịch, gửi email.

## Best Practices khi triển khai

1. **Bắt đầu nhỏ**: Triển khai 1-2 use-case rõ ràng trước, tránh làm hệ thống quá phức tạp ngay từ đầu.

2. **Design for failure**: Luôn có fallback khi AI không hiểu hoặc lỗi. Có thể là simple rule-based response hoặc human escalation.

3. **Context management**: Quản lý context window hợp lý để không vượt quá token limit của model.

4. **Response caching**: Cache các câu hỏi phổ biến để giảm cost và latency.

## Ví dụ Implementation cơ bản

```javascript
// Agent context trong React
const useAgentContext = () => {
  const [messages, setMessages] = useState([])
  const [context, setContext] = useState({})
  
  const sendMessage = async (userMessage) => {
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    
    // Call API
    const response = await fetch("/api/agent", {
      method: "POST",
      body: JSON.stringify({ message: userMessage, context })
    })
    
    const data = await response.json()
    
    // Update context if needed
    if (data.contextUpdate) {
      setContext(prev => ({ ...prev, ...data.contextUpdate }))
    }
    
    // Add agent response
    setMessages(prev => [...prev, { role: "assistant", content: data.message }])
  }
  
  return { messages, sendMessage }
}
```

## Kết luận

Bắt đầu nhỏ với 1 use-case rõ ràng trước, đo lường hiệu quả, rồi mới mở rộng dần. Đừng cố gắng xây dựng một hệ thống hoàn hảo ngay từ đầu. Iterate và cải tiến dựa trên feedback thực tế từ người dùng.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '12 min read'
),
(
  'Prompt Engineering cho Product Team',
  'Cách viết prompt theo framework để output ổn định, dễ kiểm soát và tái sử dụng trong production.',
  'Prompt Engineering không chỉ là kỹ thuật viết câu lệnh cho AI - đó là một discipline quan trọng giúp team sản phẩm xây dựng các tính năng AI có thể dự đoán được và đáng tin cậy.

## Framework cơ bản cho Prompt hiệu quả

Một prompt tốt nên tuân theo framework **RCTC** - Role, Context, Task, Constraint:

### 1. Role (Vai trò)
Xác định rõ AI đang đóng vai trò gì. Điều này giúp định hình "tư duy" của model.

```
Bạn là một trợ lý hỗ trợ khách hàng cho một nền tảng SaaS B2B, chuyên về quản lý dự án.
```

### 2. Context (Ngữ cảnh)
Cung cấp dữ liệu nền cần thiết để AI hiểu tình huống.

```
Người dùng đang sử dụng gói Premium, đã đăng ký 3 tháng trước, đang gặp vấn đề với tính năng báo cáo tự động.
```

### 3. Task (Nhiệm vụ)
Mô tả cụ thể đầu ra mong muốn.

```
Hãy giải thích cách sử dụng tính năng báo cáo tự động và đề xuất 3 cách tối ưu hóa quy trình báo cáo cho team của họ.
```

### 4. Constraint (Ràng buộc)
Những gì AI không được làm.

```
Không được đề xuất upgrade gói. Không được hứa hẹn về tính năng chưa có. Tránh dùng thuật ngữ kỹ thuật phức tạp.
```

## Best Practices từ thực tế

### Tách System Prompt và User Prompt

```javascript
const systemPrompt = `Bạn là AI assistant của Portfolio.
QUY ĐỊNH BẮT BUỘC:
- Chỉ trả lời về thông tin có trong database
- Không bịa thông tin
- Nếu không biết, trả lời: "Tôi cần xác nhận lại thông tin này"`

const userPrompt = `User hỏi: ${question}
Context: ${JSON.stringify(userData)}
Hãy trả lời ngắn gọn dưới 100 từ.`
```

### Chuẩn hóa Output Format

```
Trả về JSON với format:
{
  "answer": "câu trả lời",
  "confidence": 0-100,
  "sources": ["source1", "source2"]
}
```

### Luôn có Fallback Handler

```javascript
const handleAIResponse = (response) => {
  if (response.confidence < 70) {
    return "Tôi không chắc chắn về câu trả lời này. Bạn có muốn tôi kết nối với hỗ trợ trực tiếp?"
  }
  return response.answer
}
```

## Prompt Library cho Team

Thay vì mỗi người viết prompt riêng, hãy xây dựng Prompt Library:

```javascript
// promptLibrary.js
export const prompts = {
  summarizeBlog: {
    template: "Hãy tóm tắt bài viết sau trong 3 bullet points:\n{content}",
    variables: ["content"],
    expectedOutput: "markdown"
  },
  
  suggestRelatedPosts: {
    template: "Dựa trên bài viết '{title}' với tags {tags}, đề xuất 3 bài viết liên quan từ database.",
    variables: ["title", "tags"],
    expectedOutput: "json"
  },
  
  generateMetaDescription: {
    template: "Viết meta description SEO-friendly (max 160 chars) cho bài viết:\n{content}",
    variables: ["content"],
    expectedOutput: "string"
  }
}
```

## Versioning Prompt

Covert prompt như code - có version, changelog, và rollback:

```
/prompts
  /v1
    - customerSupport.md
    - blogGenerator.md
  /v2
    - customerSupport.md (updated for GPT-4o)
    - blogGenerator.md
```

## Kết luận

Prompt engineering là phần cốt lõi để AI đi vào sản phẩm thật. Một prompt tốt tiết kiệm chi phí, tăng độ chính xác, và quan trọng nhất - tạo trải nghiệm ổn định cho người dùng cuối. Hãy đầu tư thời gian để xây dựng Prompt Library cho team.',
  'https://images.unsplash.com/photo-1526378722484-cc5c510f55c8?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '15 min read'
),
(
  'Thiết kế AI Chatbox đúng ngữ cảnh Portfolio',
  'Làm sao để AI chatbox nói đúng về bạn, đúng dịch vụ, và hỗ trợ chuyển đổi tốt hơn.',
  'Một trong những lỗi phổ biến nhất khi triển khai AI Chatbox cho Portfolio là chatbox trả lời chung chung, không liên quan đến thông tin thực tế của bạn. Điều này không chỉ làm giảm trải nghiệm mà còn gây mất niềm tin từ khách hàng tiềm năng.

## Vấn đề với Chatbox không có Context

Hãy xem ví dụ sau:

**User**: "Bạn có nhận dự án freelance không?"

**Chatbox không có context**: "Bạn có thể liên hệ qua email để thảo luận thêm về dự án của bạn."

**Chatbox có context**: "Có, mình nhận dự án freelance frontend với React/Next.js. Thường mình làm việc với các dự án có budget từ $2000 trở lên. Bạn có thể mô tả ngắn về dự án không?"

Sự khác biệt nằm ở việc chatbox thứ hai có context về services, pricing, và cách làm việc của bạn.

## Checklist ngữ cảnh cho Portfolio Chatbox

### 1. Thông tin cá nhân
```
- Tên, vai trò, kinh nghiệm
- Skills chính và secondary
- Location và timezone
- Languages
```

### 2. Services & Pricing
```
- Các dịch vụ cung cấp
- Range giá (nếu công khai)
- Quy trình làm việc
- Thời gian delivery trung bình
```

### 3. Projects & Case Studies
```
- Tổng số projects đã làm
- Industries đã phục vụ
- Tech stacks thường dùng
- Highlight projects
```

### 4. Availability
```
- Current status (available/busy)
- Lead time cho dự án mới
- Preferred contact method
```

## Cách inject Context vào Prompt

```javascript
const buildSystemPrompt = (portfolioData) => {
  return `Bạn là AI Assistant cho Portfolio của ${portfolioData.name}.

THÔNG TIN CÁ NHÂN:
- Tên: ${portfolioData.name}
- Vai trò: ${portfolioData.role}
- Kinh nghiệm: ${portfolioData.experience}
- Skills: ${portfolioData.skills.join(", ")}

DỊCH VỤ:
${portfolioData.services.map(s => `- ${s.name}: ${s.description} (từ ${s.priceRange})`).join("\n")}

DỰ ÁN NỔI BẬT:
${portfolioData.projects.map(p => `- ${p.title}: ${p.techStack.join(", ")}`).join("\n")}

QUY ĐỊNH:
- Chỉ trả lời dựa trên thông tin trên
- Không bịa thông tin
- Nếu không có thông tin, nói rõ và đề xuất cách liên hệ trực tiếp
- Giọng văn: ${portfolioData.tone}`
}
```

## Quick Actions bám Persona

Thay vì để user tự gõ, hãy cung cấp quick actions phù hợp:

```javascript
const quickActions = {
  potentialClient: [
    "Chi tiết dịch vụ frontend?",
    "Process làm việc như thế nào?",
    "Nhận dự án gấp không?"
  ],
  recruiter: [
    "Xem CV đầy đủ",
    "Github profile",
    "Sắp xếp interview"
  ],
  fellowDeveloper: [
    "Tech stack hiện tại?",
    "Open source projects?",
    "Contact để networking"
  ]
}

// Detect intent từ first message để suggest actions
const detectPersona = (message) => {
  if (/tuyển|hiring|position|job/i.test(message)) return "recruiter"
  if (/dự án|project|làm|hire/i.test(message)) return "potentialClient"
  return "fellowDeveloper"
}
```

## UX Features cần có

### 1. Đóng chat khi click outside
```javascript
useEffect(() => {
  const handleClickOutside = (e) => {
    if (chatRef.current && !chatRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }
  document.addEventListener("mousedown", handleClickOutside)
  return () => document.removeEventListener("mousedown", handleClickOutside)
}, [])
```

### 2. Enter để gửi, chống double-send
```javascript
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey && !isSending) {
    e.preventDefault()
    sendMessage()
  }
}
```

### 3. Hiển thị trạng thái đang trả lời
```javascript
{isTyping && (
  <div className="typing-indicator">
    <span></span><span></span><span></span>
  </div>
)}
```

## Loại bỏ nội dung không phù hợp

```javascript
const forbiddenTopics = [
  "báo giá cứng (luôn để range)",
  "thông tin cá nhân nhạy cảm",
  "political opinions",
  "guaranteed outcomes"
]

const validateResponse = (response) => {
  for (const topic of forbiddenTopics) {
    if (containsTopic(response, topic)) {
      return getSafeResponse(topic)
    }
  }
  return response
}
```

## Kết luận

AI chatbox tốt không chỉ có UI đẹp mà còn có ngữ cảnh thật về portfolio của bạn. Hãy đầu tư thời gian xây dựng knowledge base đầy đủ, cập nhật định kỳ, và test với nhiều loại user khác nhau. Một chatbox được thiết kế tốt có thể trở thành sales assistant 24/7 cho bạn.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '18 min read'
),
(
  'RAG cơ bản cho website nội dung',
  'Giới thiệu mô hình Retrieval-Augmented Generation để AI trả lời chính xác theo dữ liệu nội bộ.',
  'RAG (Retrieval-Augmented Generation) là một trong những kỹ thuật quan trọng nhất để xây dựng AI applications có khả năng trả lời dựa trên dữ liệu thực tế của bạn, thay vì dựa vào kiến thức chung chung của pre-trained model.

## Tại sao cần RAG?

LLM (Large Language Model) có một hạn chế lớn: chúng chỉ biết những gì đã được train. Nếu bạn hỏi về:

- Dữ liệu riêng của công ty
- Thông tin cập nhật sau training cutoff
- Nội dung dynamic như giá sản phẩm

LLM sẽ không thể trả lời chính xác, hoặc tệ hơn - sẽ "hallucinate" (bịa thông tin).

RAG giải quyết vấn đề này bằng cách retrieve thông tin liên quan từ database trước, rồi dùng LLM để synthesize câu trả lời.

## Kiến trúc RAG cơ bản

```
User Query → Embedding → Vector Search → Retrieve Context → LLM → Response
```

### Thành phần chính:

1. **Embedding Model**: Chuyển text thành vector (số). Popular: OpenAI text-embedding-3, Cohere embed.

2. **Vector Database**: Lưu trữ vectors và hỗ trợ similarity search. Popular: Pinecone, Weaviate, Qdrant, pgvector (PostgreSQL).

3. **Retriever**: Logic để tìm relevant documents.

4. **LLM Generator**: Model sinh câu trả lời.

## Implementation với pgvector

Nếu bạn đang dùng PostgreSQL (như Supabase), pgvector là lựa chọn tối ưu:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table for blog posts with embeddings
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  embedding VECTOR(1536) -- OpenAI embedding dimension
);

-- Create index for fast search
CREATE INDEX ON blog_posts USING ivfflat (embedding vector_cosine_ops);
```

```javascript
// Generate and store embedding
import { OpenAI } from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const generateEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  })
  return response.data[0].embedding
}

// Store post with embedding
const savePost = async (title, content) => {
  const embedding = await generateEmbedding(`${title} ${content}`)
  await supabase.from("blog_posts").insert({
    title,
    content,
    embedding
  })
}
```

```javascript
// Search similar posts
const searchPosts = async (query, limit = 5) => {
  const queryEmbedding = await generateEmbedding(query)
  
  const { data } = await supabase.rpc("match_posts", {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: limit
  })
  
  return data
}
```

## Khi nào chưa cần RAG?

RAG không phải là giải pháp cho mọi bài toán:

### Không cần RAG khi:
- Dữ liệu ít (< 100 documents)
- Nội dung tĩnh, ít thay đổi
- Chỉ cần FAQ đơn giản

### Giải pháp thay thế:
- Hard-coded responses cho các câu hỏi phổ biến
- Keyword search truyền thống
- Pre-generated responses cache

## RAG Pipeline hoàn chỉnh

```javascript
class RAGPipeline {
  constructor(options = {}) {
    this.embeddingModel = options.embeddingModel || "text-embedding-3-small"
    this.llmModel = options.llmModel || "gpt-4o-mini"
    this.chunkSize = options.chunkSize || 1000
    this.overlap = options.overlap || 200
  }

  async index(content) {
    // 1. Chunk content
    const chunks = this.chunkText(content)
    
    // 2. Generate embeddings
    const embeddings = await Promise.all(
      chunks.map(chunk => generateEmbedding(chunk))
    )
    
    // 3. Store
    await storeChunks(chunks, embeddings)
  }

  async query(question) {
    // 1. Embed question
    const questionEmbedding = await generateEmbedding(question)
    
    // 2. Retrieve relevant chunks
    const relevantChunks = await retrieveChunks(questionEmbedding, 5)
    
    // 3. Build context
    const context = relevantChunks.map(c => c.content).join("\n\n")
    
    // 4. Generate response
    const response = await generateResponse({
      model: this.llmModel,
      messages: [
        { role: "system", content: `Answer based on:\n${context}` },
        { role: "user", content: question }
      ]
    })
    
    return {
      answer: response.content,
      sources: relevantChunks.map(c => c.metadata)
    }
  }
}
```

## Kết luận

RAG phù hợp khi bạn có:
- Dữ liệu lớn và cập nhật thường xuyên
- Cần trả lời chính xác dựa trên dữ liệu thực tế
- Muốn cite sources trong câu trả lời

Bắt đầu với implementation đơn giản, measure performance, rồi mới optimize từng thành phần (chunking strategy, retrieval algorithm, reranking, etc.).',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '20 min read'
),
(
  'Tối ưu chi phí khi tích hợp LLM',
  'Các chiến lược giảm token cost mà vẫn giữ trải nghiệm tốt cho người dùng cuối.',
  'Chi phí LLM có thể tăng rất nhanh nếu không có chiến lược kiểm soát. Bài viết này sẽ đi qua các kỹ thuật thực tế để giảm cost mà không hy sinh trải nghiệm người dùng.

## Hiểu về Cost Structure

Trước khi tối ưu, cần hiểu cách các provider tính phí:

### Token-based Pricing
- **Input tokens**: Số token bạn gửi cho model (prompt + context)
- **Output tokens**: Số token model sinh ra

### Ví dụ GPT-4o-mini:
- Input: $0.15 / 1M tokens
- Output: $0.60 / 1M tokens

Có vẻ rẻ, nhưng với 1000 users, mỗi user gửi 10 messages/ngày với average 500 input tokens + 200 output tokens:
- Daily cost: 1000 × 10 × (500 × 0.15 + 200 × 0.60) / 1M = $1.95
- Monthly: ~$60

Scale thêm 10x → $600/tháng. Chưa kể context window, conversation history...

## Chiến lược Tối ưu

### 1. Caching theo Intent

Không phải mọi query đều cần gọi LLM. Cache responses cho các câu hỏi phổ biến:

```javascript
const intentCache = new Map([
  ["greeting", "Xin chào! Tôi có thể giúp gì cho bạn?"],
  ["contact", "Bạn có thể liên hệ qua email: example@email.com"],
  ["pricing", "Chi tiết giá vui lòng xem tại trang Pricing"],
])

const getCachedOrGenerate = async (query) => {
  const intent = await classifyIntent(query)
  
  if (intentCache.has(intent)) {
    return { response: intentCache.get(intent), cached: true }
  }
  
  const response = await callLLM(query)
  intentCache.set(intent, response)
  
  return { response, cached: false }
}
```

### 2. Giới hạn Context Window

Đừng gửi toàn bộ conversation history. Chỉ giữ:

```javascript
const trimHistory = (messages, maxTokens = 2000) => {
  let totalTokens = 0
  const trimmed = []
  
  // Lấy từ message mới nhất
  for (let i = messages.length - 1; i >= 0; i--) {
    const msgTokens = estimateTokens(messages[i].content)
    if (totalTokens + msgTokens > maxTokens) break
    
    trimmed.unshift(messages[i])
    totalTokens += msgTokens
  }
  
  return trimmed
}
```

### 3. Chọn Model theo Task

Không phải task nào cũng cần GPT-4:

```javascript
const selectModel = (task) => {
  const modelMapping = {
    "classification": "gpt-4o-mini", // Fast, cheap
    "simple_qa": "gpt-4o-mini",
    "summarization": "gpt-4o-mini",
    "complex_reasoning": "gpt-4o",
    "creative_writing": "gpt-4o",
    "code_generation": "gpt-4o"
  }
  
  return modelMapping[task] || "gpt-4o-mini"
}
```

### 4. Streaming cho Long Responses

Streaming không giảm token cost, nhưng giảm perceived latency:

```javascript
const streamResponse = async (messages, onChunk) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    stream: true
  })
  
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ""
    onChunk(content)
  }
}
```

### 5. Fallback sang Rule-based

Một số task không cần AI:

```javascript
const handleFAQ = (question) => {
  const faqMap = {
    "giờ làm việc": "Thứ 2-6: 9h-18h, Thứ 7: 9h-12h",
    "địa chỉ": "123 Nguyễn Huệ, Q1, TP.HCM",
    "hotline": "1900 xxxx",
  }
  
  for (const [keyword, answer] of Object.entries(faqMap)) {
    if (question.toLowerCase().includes(keyword)) {
      return { answer, method: "rule-based", cost: 0 }
    }
  }
  
  return null // Fall through to LLM
}
```

## Monitoring và Alerting

### Track Metrics

```javascript
const trackUsage = async (params) => {
  const { model, inputTokens, outputTokens, latency, cached } = params
  
  await supabase.from("ai_usage").insert({
    model,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    latency_ms: latency,
    cached,
    cost: calculateCost(model, inputTokens, outputTokens),
    timestamp: new Date()
  })
}
```

### Set Budget Alerts

```javascript
const checkBudget = async () => {
  const { data: usage } = await supabase
    .from("ai_usage")
    .select("cost")
    .gte("timestamp", startOfMonth)
  
  const totalCost = usage.reduce((sum, u) => sum + u.cost, 0)
  const budget = 100 // $100
  
  if (totalCost > budget * 0.8) {
    await sendAlert(`AI usage at 80% of budget: $${totalCost}`)
  }
  
  if (totalCost > budget) {
    // Switch to cheaper model or disable features
    await enableCostSavingMode()
  }
}
```

## ROI Calculation

Luôn measure ROI của AI feature:

```
ROI = (Revenue from AI feature - AI Cost) / AI Cost × 100

Example:
- Feature: AI-powered product recommendations
- Revenue: $5000/month (increased conversions)
- Cost: $300/month (LLM + infrastructure)
- ROI = (5000 - 300) / 300 × 100 = 1567%
```

## Kết luận

Chi phí thấp + trải nghiệm tốt là hoàn toàn khả thi nếu:

1. Design caching strategy từ đầu
2. Use right model for right job
3. Monitor usage religiously
4. Have fallback plans

Đừng optimize sớm, nhưng hãy design để có thể optimize khi cần.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '22 min read'
),
(
  'AI Search cho Blog: Semantic Search thực chiến',
  'Nâng cấp search blog từ keyword sang semantic để tìm đúng ý hơn.',
  'Semantic Search là bước tiến lớn so với keyword search truyền thống. Thay vì match chính xác từ khóa, semantic search hiểu được ý định và ngữ cảnh của câu query.

## Keyword Search vs Semantic Search

### Keyword Search
- Query: "react hooks"
- Results: Chỉ tìm được bài có chứa "react hooks"
- Miss: "useEffect tutorial", "state management trong React"

### Semantic Search
- Query: "react hooks"
- Results: Tìm được cả bài về useEffect, useState, state management
- Hiểu được "hooks" liên quan đến các concepts khác trong React

## Kiến trúc Semantic Search

```
Content → Embedding → Vector DB → Index
                            ↓
Query → Embedding → Vector Search → Ranking → Results
```

## Implementation Step by Step

### Step 1: Chuẩn bị dữ liệu

```javascript
const prepareBlogContent = (post) => {
  // Combine relevant fields for better search
  return `${post.title}
${post.excerpt}
${post.category}
${post.tags?.join(" ")}
${post.content.slice(0, 500)}` // First 500 chars of content
}
```

### Step 2: Tạo Embeddings

```javascript
import { OpenAI } from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const createEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small", // 1536 dimensions, good balance
    input: text,
    encoding_format: "float"
  })
  
  return response.data[0].embedding
}

// Batch process all posts
const indexAllPosts = async (posts) => {
  for (const post of posts) {
    const content = prepareBlogContent(post)
    const embedding = await createEmbedding(content)
    
    await savePostWithEmbedding(post.id, embedding)
  }
}
```

### Step 3: Vector Search

```javascript
const semanticSearch = async (query, options = {}) => {
  const {
    limit = 5,
    threshold = 0.7,
    filters = {}
  } = options
  
  // 1. Embed query
  const queryEmbedding = await createEmbedding(query)
  
  // 2. Search
  const { data } = await supabase.rpc("semantic_search", {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: limit,
    filter_category: filters.category || null
  })
  
  return data
}
```

### Step 4: Hybrid Search (Semantic + Keyword)

Kết hợp cả hai approaches để có kết quả tốt nhất:

```javascript
const hybridSearch = async (query, options = {}) => {
  const { limit = 10 } = options
  
  // Run both searches in parallel
  const [semantic, keyword] = await Promise.all([
    semanticSearch(query, { limit: limit / 2 }),
    keywordSearch(query, { limit: limit / 2 })
  ])
  
  // Merge and deduplicate
  const merged = [...semantic, ...keyword]
  const unique = deduplicateById(merged)
  
  // Re-rank
  return rerank(unique, query).slice(0, limit)
}

const rerank = (results, query) => {
  // Simple scoring: semantic similarity + keyword match
  return results.sort((a, b) => {
    const scoreA = a.similarity * 0.7 + keywordMatchScore(a, query) * 0.3
    const scoreB = b.similarity * 0.7 + keywordMatchScore(b, query) * 0.3
    return scoreB - scoreA
  })
}
```

## SQL Function cho pgvector

```sql
CREATE OR REPLACE FUNCTION semantic_search(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5,
  filter_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  id INT,
  title TEXT,
  excerpt TEXT,
  similarity FLOAT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.title,
    p.excerpt,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM posts p
  WHERE
    (filter_category IS NULL OR p.category = filter_category)
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;
```

## Frontend Integration

```jsx
import { useState, useCallback } from "react"
import debounce from "lodash/debounce"

const SearchBlog = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  const search = useCallback(
    debounce(async (q) => {
      if (q.length < 3) return
      
      setIsSearching(true)
      const data = await semanticSearch(q)
      setResults(data)
      setIsSearching(false)
    }, 300),
    []
  )
  
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    search(value)
  }
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search articles..."
      />
      
      {isSearching && <Spinner />}
      
      <ul>
        {results.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span>Similarity: {(post.similarity * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Optimizations

### 1. Index Optimization
```sql
-- Create IVFFlat index for faster search
CREATE INDEX ON posts USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### 2. Query Caching
```javascript
const searchCache = new Map()

const cachedSearch = async (query) => {
  const cacheKey = query.toLowerCase().trim()
  
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)
  }
  
  const results = await semanticSearch(query)
  searchCache.set(cacheKey, results)
  
  // Clear cache periodically
  setTimeout(() => searchCache.delete(cacheKey), 5 * 60 * 1000)
  
  return results
}
```

### 3. Pre-compute Popular Searches
```javascript
const popularSearches = ["react hooks", "nextjs", "typescript", "ai"]

const warmupCache = async () => {
  await Promise.all(
    popularSearches.map(query => cachedSearch(query))
  )
}
```

## Kết luận

Semantic Search phù hợp cho:
- Blog với nhiều nội dung chuyên môn
- Cần tìm theo ý nghĩa, không phải chính xác từ khóa
- Muốn suggest related content

Chi phí: Embedding API calls, Vector DB storage. Nhưng với blog nhỏ, cost này rất thấp (thường dưới $1/tháng).',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '25 min read'
);

-- Thêm các bài blog về Web Development
INSERT INTO posts (title, excerpt, content, image, category, author, read_time) VALUES
(
  'React Performance: Những mistakes phổ biến và cách tránh',
  'Phân tích các lỗi hiệu năng thường gặp trong React app và giải pháp thực tế.',
  'Performance là một trong những chủ đề quan trọng nhất khi phát triển React application ở quy mô production. Bài viết này sẽ đi qua những mistakes phổ biến mà tôi gặp phải khi review code.

## 1. Re-render không cần thiết

### Vấn đề
Component re-render khi không cần thiết, gây lag UI và tốn CPU.

### Nguyên nhân thường gặp
```jsx
// ❌ Sai: Tạo object mới mỗi render
function Parent({ data }) {
  return <Child style={{ color: "red" }} data={data} />
}

// ✅ Đúng: Memoize object
function Parent({ data }) {
  const style = useMemo(() => ({ color: "red" }), [])
  return <Child style={style} data={data} />
}
```

### Giải pháp
- Sử dụng `React.memo` cho components nhận props phức tạp
- Dùng `useMemo` cho computed values
- Dùng `useCallback` cho event handlers

```jsx
const ExpensiveComponent = React.memo(({ data, onItemClick }) => {
  // Component chỉ re-render khi data hoặc onItemClick thay đổi
  return (
    <ul>
      {data.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
})

function Parent() {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0) // Unrelated state
  
  // ✅ Callback được memoize
  const handleItemClick = useCallback((item) => {
    console.log("Clicked:", item)
  }, [])
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} onItemClick={handleItemClick} />
    </div>
  )
}
```

## 2. List Rendering không có Key hoặc dùng Index

### Vấn đề
```jsx
// ❌ Sai
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

### Tại sao sai?
- Index thay đổi khi list bị modify (add, remove, reorder)
- React không track được item nào đã thay đổi
- Gây re-render toàn bộ list

### Giải pháp
```jsx
// ✅ Đúng: Dùng unique ID
{items.map(item => (
  <Item key={item.id} {...item} />
))}

// Nếu không có ID, tạo một
{items.map(item => (
  <Item key={item.slug || item.title} {...item} />
))}
```

## 3. Large Bundle Size

### Vấn đề
Bundle JavaScript quá lớn, load lâu, đặc biệt trên mobile.

### Phân tích
```bash
# Analyze bundle
npx vite-bundle-visualizer

# Hoặc với Webpack
npx webpack-bundle-analyzer
```

### Giải pháp: Code Splitting

```jsx
// ❌ Sai: Import tất cả cùng lúc
import HeavyComponent from "./HeavyComponent"
import AnotherHeavy from "./AnotherHeavy"

// ✅ Đúng: Lazy load
const HeavyComponent = React.lazy(() => import("./HeavyComponent"))
const AnotherHeavy = React.lazy(() => import("./AnotherHeavy"))

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <HeavyComponent />
    </React.Suspense>
  )
}
```

### Route-based Code Splitting
```jsx
import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))
const Blog = lazy(() => import("./pages/Blog"))
const Contact = lazy(() => import("./pages/Contact"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

## 4. State Management không hiệu quả

### Vấn đề: Prop Drilling
```jsx
// Prop drilling qua nhiều levels
function App() {
  const [user, setUser] = useState(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />
}

function Sidebar({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />
}
```

### Giải pháp: Context hoặc State Library
```jsx
// Context
const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  )
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext)
  // ...
}
```

## 5. Memory Leaks

### Vấn đề
```jsx
// ❌ Memory leak
useEffect(() => {
  fetchData().then(data => setState(data))
  // Nếu component unmount trước khi fetch xong
  // setState sẽ được gọi trên unmounted component
}, [])
```

### Giải pháp
```jsx
// ✅ Cleanup effect
useEffect(() => {
  let isMounted = true
  
  fetchData().then(data => {
    if (isMounted) {
      setState(data)
    }
  })
  
  return () => {
    isMounted = false
  }
}, [])

// Hoặc dùng AbortController cho fetch
useEffect(() => {
  const controller = new AbortController()
  
  fetchData({ signal: controller.signal })
    .then(data => setState(data))
    .catch(err => {
      if (err.name !== "AbortError") {
        console.error(err)
      }
    })
  
  return () => controller.abort()
}, [])
```

## 6. Chặn Main Thread quá lâu

### Vấn đề
Heavy computation blocking UI, gây freeze.

### Giải pháp: Web Workers
```jsx
// worker.js
self.onmessage = function(e) {
  const result = heavyComputation(e.data)
  self.postMessage(result)
}

// Component
function HeavyComputation() {
  const [result, setResult] = useState(null)
  
  useEffect(() => {
    const worker = new Worker("./worker.js")
    
    worker.onmessage = (e) => {
      setResult(e.data)
      worker.terminate()
    }
    
    worker.postMessage(inputData)
    
    return () => worker.terminate()
  }, [inputData])
  
  return <div>{result}</div>
}
```

## Kết luận

Performance optimization không phải là làm một lần. Là process:

1. **Measure** - Đo lường trước khi optimize
2. **Identify** - Tìm bottleneck
3. **Optimize** - Áp dụng giải pháp
4. **Verify** - Đo lại để confirm improvement

Dùng React DevTools Profiler để identify issues. Đừng optimize prematurely!',
  'https://images.unsplash.com/photo-1633356122544-f134324a5cee?w=1200',
  'Web Development',
  'Phan Tiến Đạt',
  '18 min read'
),
(
  'Building Design System từ con số 0',
  'Hướng dẫn từng bước xây dựng Design System cho team frontend nhỏ.',
  'Design System không chỉ dành cho big tech. Ngay cả team nhỏ 2-3 người cũng có thể (và nên) có design system để đảm bảo consistency và speed.

## Design System là gì?

Design System = Design Tokens + Components + Documentation

- **Design Tokens**: Colors, spacing, typography, shadows...
- **Components**: Buttons, inputs, cards, modals...
- **Documentation**: Usage guidelines, do/donts, examples

## Step 1: Thiết lập Design Tokens

### Colors
```css
/* tokens/colors.css */
:root {
  /* Primary */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;
  
  /* Accent */
  --color-accent: #8b5cf6;
  
  /* Neutral */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;
  
  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Theme variants */
  --bg-primary: var(--color-gray-900);
  --bg-secondary: var(--color-gray-800);
  --text-primary: var(--color-gray-100);
  --text-secondary: var(--color-gray-400);
}
```

### Typography Scale
```css
/* tokens/typography.css */
:root {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  
  /* Font sizes - using modular scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem;  /* 36px */
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

### Spacing Scale
```css
/* tokens/spacing.css */
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */
}
```

## Step 2: Base Components

### Button Component
```jsx
// components/ui/Button.jsx
const buttonVariants = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600",
  outline: "border border-gray-500 text-gray-300 hover:bg-gray-800",
  ghost: "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
}

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors",
        buttonVariants[variant],
        buttonSizes[size]
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Input Component
```jsx
// components/ui/Input.jsx
export const Input = ({ label, error, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-gray-300">{label}</label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2",
          "bg-gray-800 border border-gray-700 rounded-lg",
          "text-white placeholder-gray-500",
          "focus:outline-none focus:border-primary-500",
          error && "border-error"
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}
```

## Step 3: Utility Functions

### cn() - Class Names Merger
```javascript
// utils/cn.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines clsx and tailwind-merge
export const cn = (...classes) => {
  return twMerge(clsx(classes))
}

// Usage
cn("px-4 py-2", isActive && "bg-primary", className)
```

## Step 4: Component Patterns

### Compound Components Pattern
```jsx
// components/ui/Card.jsx
const CardContext = createContext(null)

export const Card = ({ children, ...props }) => {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800" {...props}>
      {children}
    </div>
  )
}

Card.Header = ({ children }) => (
  <div className="p-4 border-b border-gray-700">{children}</div>
)

Card.Body = ({ children }) => (
  <div className="p-4">{children}</div>
)

Card.Footer = ({ children }) => (
  <div className="p-4 border-t border-gray-700 bg-gray-900 rounded-b-xl">
    {children}
  </div>
)

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props Pattern
```jsx
export const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return children({ data, loading, error })
}

// Usage
<DataFetcher url="/api/posts">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />
    if (error) return <Error />
    return <Posts data={data} />
  }}
</DataFetcher>
```

## Step 5: Documentation

Mỗi component nên có:

```jsx
/**
 * Button component for user interactions.
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * 
 * @example
 * <Button variant="outline" onClick={handleClick}>Outline</Button>
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} props.variant
 * @param {'sm' | 'md' | 'lg'} props.size
 */
export const Button = (props) => { ... }
```

## Kết luận

Design System là investment, không phải cost. Bắt đầu nhỏ:

1. Define tokens (colors, spacing, typography)
2. Build base components (Button, Input, Card)
3. Create utility functions (cn, formatDate)
4. Document as you go
5. Iterate based on team feedback

Với team nhỏ, có thể dùng Tailwind + CSS Variables làm foundation, không cần从头 viết tất cả.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
  'Web Development',
  'Phan Tiến Đạt',
  '20 min read'
),
(
  'TypeScript Tips cho React Developer',
  'Những pattern TypeScript hữu ích khi làm việc với React.',
  'TypeScript và React là combo mạnh mẽ, nhưng cũng có nhiều gotchas. Bài viết này tổng hợp các tips thực tế từ kinh nghiệm project.

## 1. Typing Props Properly

### Basic Props
```tsx
// ❌ Don't use 'any'
interface Props {
  data: any
  onClick: any
}

// ✅ Use specific types
interface Props {
  data: Post
  onClick: (id: string) => void
  optional?: string // Optional prop
}
```

### Props with Children
```tsx
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  title: string
}

export const Card = ({ children, title }: Props) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### Generic Components
```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string
}

export const List = <T,>({ items, renderItem, keyExtractor }: ListProps<T>) => {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// Usage
<List
  items={posts}
  renderItem={post => <PostCard post={post} />}
  keyExtractor={post => post.id}
/>
```

## 2. Typing useState & useReducer

### useState with Union Types
```tsx
type Status = "idle" | "loading" | "success" | "error"

const [status, setStatus] = useState<Status>("idle")

// TypeScript knows setStatus only accepts Status values
setStatus("loading") // ✅
setStatus("running") // ❌ Error
```

### Complex State Type
```tsx
interface State {
  data: Post[] | null
  loading: boolean
  error: string | null
}

const initialState: State = {
  data: null,
  loading: false,
  error: null
}

const [state, setState] = useState<State>(initialState)
```

### useReducer với TypeScript
```tsx
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Post[] }
  | { type: "FETCH_ERROR"; payload: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload }
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
```

## 3. Typing useRef

### DOM Element Ref
```tsx
import { useRef, useEffect } from "react"

export const InputWithFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  return <input ref={inputRef} />
}
```

### Mutable Ref
```tsx
// For values that don't trigger re-render
const timerRef = useRef<NodeJS.Timeout | null>(null)

useEffect(() => {
  timerRef.current = setInterval(() => {
    console.log("tick")
  }, 1000)
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
}, [])
```

## 4. Typing useCallback & useMemo

### useCallback
```tsx
import { useCallback } from "react"

const handleClick = useCallback((id: string) => {
  console.log("Clicked:", id)
}, [])

// With dependencies
const handleSubmit = useCallback((data: FormData) => {
  submitToServer(data, userId)
}, [userId]) // userId is captured in closure
```

### useMemo
```tsx
import { useMemo } from "react"

const sortedPosts = useMemo(() => {
  return [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}, [posts]) // Only re-sort when posts change
```

## 5. Typing Context

### Create Typed Context
```tsx
import { createContext, useContext, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  
  const login = async (email: string, password: string) => {
    // Implementation
  }
  
  const logout = () => {
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook with null check
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
```

## 6. Typing API Responses

### API Types
```tsx
// types/api.ts
interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface Post {
  id: string
  title: string
  content: string
  author: Author
  createdAt: string
  updatedAt: string
}

interface Author {
  id: string
  name: string
  avatar?: string
}

// API function
export const fetchPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Post>> => {
  const response = await fetch(`/api/posts?page=${page}&limit=${limit}`)
  return response.json()
}
```

### Error Typing
```tsx
interface ApiError {
  message: string
  code: string
  details?: Record<string, string>
}

const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "UNKNOWN"
    }
  }
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN"
  }
}
```

## 7. Utility Types for React

### Extract Props Types
```tsx
import { ComponentProps } from "react"

type ButtonProps = ComponentProps<"button">
// Gives all button HTML element props

type ButtonBaseProps = ComponentProps<typeof Button>
// Gives props of custom Button component
```

### Omit & Pick
```tsx
interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Create variant that doesn't need title
type SimpleModalProps = Omit<BaseModalProps, "title">

// Create variant with only specific props
type ModalHeaderProps = Pick<BaseModalProps, "title" | "onClose">
```

### Partial for Forms
```tsx
interface User {
  id: string
  name: string
  email: string
  avatar: string
}

// When creating, omit id
type CreateUserData = Omit<User, "id">

// When editing, make all optional
type EditUserData = Partial<Omit<User, "id">>

const EditForm = ({ user }: { user: User }) => {
  const [data, setData] = useState<EditUserData>({})
  
  // ...
}
```

## Kết luận

TypeScript trong React giúp:

- Catch bugs at compile time
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Safer refactoring

Invest time learning TypeScript pays off quickly. Start with strict mode disabled, then enable incrementally.',
  'https://images.unsplash.com/photo-1516116216240-5b1719a628e8?w=1200',
  'Web Development',
  'Phan Tiến Đạt',
  '22 min read'
),
(
  'CSS Grid vs Flexbox: Khi nào dùng cái nào?',
  'So sánh thực tế giữa Grid và Flexbox với các use cases cụ thể.',
  'Grid và Flexbox đều là tools mạnh mẽ cho layout, nhưng chúng được thiết kế cho những bài toán khác nhau. Bài viết này giúp bạn chọn đúng tool cho đúng job.

## Bản chất khác biệt

### Flexbox: One-dimensional
Flexbox làm việc với **một chiều** - hoặc horizontal (row) hoặc vertical (column).

```css
.container {
  display: flex;
  flex-direction: row; /* hoặc column */
}
```

Items được layout theo một line, có thể wrap xuống dòng mới.

### Grid: Two-dimensional
Grid làm việc với **hai chiều** - cả rows và columns cùng lúc.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
}
```

Items được đặt vào cells trong một grid matrix.

## Khi nào dùng Flexbox?

### 1. Navigation
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}
```

### 2. Card Content
```css
.card {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
```

### 3. Centering
```css
.center-me {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 4. Form Elements
```css
.form-row {
  display: flex;
  gap: 1rem;
}

.form-row label {
  flex: 0 0 150px; /* Fixed width */
}

.form-row input {
  flex: 1; /* Take remaining space */
}
```

## Khi nào dùng Grid?

### 1. Page Layout
```css
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### 2. Photo Gallery
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item.featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

### 3. Blog Layout
```css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.blog-main {
  grid-column: 1 / 9; /* 8 columns */
}

.blog-sidebar {
  grid-column: 9 / 13; /* 4 columns */
}
```

### 4. Dashboard Widgets
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 1.5rem;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}

.widget-tall {
  grid-row: span 2;
}
```

## Kết hợp cả hai

Thực tế, project nào cũng cần cả hai, thường kết hợp:

```css
/* Page level: Grid */
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Header: Flexbox */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Main content: Grid */
.main {
  display: grid;
  grid-template-columns: 250px 1fr;
}

/* Sidebar items: Flexbox */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Cards inside main: Grid */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Inside each card: Flexbox */
.card {
  display: flex;
  flex-direction: column;
}
```

## Responsive Design Patterns

### Flexbox Responsive
```css
.nav {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
  }
}
```

### Grid Responsive
```css
/* Without media queries! */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* This automatically adjusts columns based on available space */
```

### Advanced Grid Responsive
```css
.dashboard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .dashboard {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## Decision Framework

Hỏi mình các câu hỏi sau:

1. **Layout 1D hay 2D?**
   - 1D (line) → Flexbox
   - 2D (matrix) → Grid

2. **Content-driven hay Layout-driven?**
   - Content quyết định kích thước → Flexbox
   - Layout quyết định kích thước → Grid

3. **Need precise control?**
   - Cần control chính xác position → Grid
   - Cần flow tự nhiên → Flexbox

4. **Component-level hay Page-level?**
   - Component (button, card content) → Flexbox
   - Page (entire layout) → Grid

## Quick Reference

| Use Case | Best Choice |
|----------|-------------|
| Navigation | Flexbox |
| Card content | Flexbox |
| Centering | Flexbox |
| Form rows | Flexbox |
| Page layout | Grid |
| Photo gallery | Grid |
| Dashboard widgets | Grid |
| Blog layout | Grid |
| Responsive cards grid | Grid |

## Kết luận

Không phải "Grid hay Flexbox" mà là "Grid VÀ Flexbox". Mỗi cái có strengths riêng:

- **Flexbox**: 1D layouts, content-driven, alignment
- **Grid**: 2D layouts, structure-driven, precise placement

Master cả hai, biết khi nào dùng cái nào, và kết hợp chúng một cách hợp lý.',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200',
  'Web Development',
  'Phan Tiến Đạt',
  '15 min read'
);