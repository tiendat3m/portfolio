-- Seed thêm bài blog AI để làm UI đẹp hơn
-- Chạy file này trong Supabase SQL Editor sau khi đã có schema 001

INSERT INTO posts (title, excerpt, content, image, category, author, read_time) VALUES
(
  'AI Agents trong Frontend: Bắt đầu từ đâu?',
  'Tổng quan thực tế để tích hợp AI Agent vào web app mà không làm hệ thống phức tạp quá mức.',
  'AI Agent không chỉ là chatbot. Trong frontend, bạn có thể dùng agent cho các flow như hỗ trợ người dùng, tự động hoá form, và đề xuất nội dung theo ngữ cảnh.

## Khi nào nên dùng AI Agent

- Có nhiều tác vụ lặp lại theo rule rõ ràng
- Cần trải nghiệm tương tác tự nhiên hơn
- Muốn rút ngắn thời gian thao tác của user

## Kiến trúc gợi ý

Frontend (React) -> API layer -> LLM provider -> Tool handlers

## Kết luận

Bắt đầu nhỏ với 1 use-case rõ ràng trước, rồi mới mở rộng.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '7 min read'
),
(
  'Prompt Engineering cho Product Team',
  'Cách viết prompt theo framework để output ổn định, dễ kiểm soát và tái sử dụng trong production.',
  'Prompt tốt giúp giảm rất nhiều lỗi trả lời sai ngữ cảnh.

## Framework đơn giản

1. Role: AI đang đóng vai trò gì?
2. Context: dữ liệu nền là gì?
3. Task: đầu ra mong muốn cụ thể ra sao?
4. Constraint: những gì không được làm

## Best practices

- Tách prompt hệ thống và prompt người dùng
- Chuẩn hoá format output
- Luôn có fallback khi model lỗi

## Kết luận

Prompt engineering là phần cốt lõi để AI đi vào sản phẩm thật.',
  'https://images.unsplash.com/photo-1526378722484-cc5c510f55c8?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '6 min read'
),
(
  'Thiết kế AI Chatbox đúng ngữ cảnh Portfolio',
  'Làm sao để AI chatbox nói đúng về bạn, đúng dịch vụ, và hỗ trợ chuyển đổi tốt hơn.',
  'Một lỗi phổ biến là chatbox trả lời chung chung, không liên quan profile thực tế.

## Checklist ngữ cảnh

- Cập nhật skills và experience thật
- Gợi ý quick actions bám persona
- Loại bỏ nội dung không phù hợp (ví dụ báo giá cứng)

## UX cần có

- Đóng chat khi click outside
- Enter để gửi, chống double-send
- Hiển thị trạng thái đang trả lời

## Kết luận

AI chatbox tốt là chatbox có ngữ cảnh thật, không chỉ đẹp UI.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '5 min read'
),
(
  'RAG cơ bản cho website nội dung',
  'Giới thiệu mô hình Retrieval-Augmented Generation để AI trả lời chính xác theo dữ liệu nội bộ.',
  'RAG giúp AI không nói “hallucination” quá nhiều khi trả lời.

## Thành phần chính

- Embedding dữ liệu
- Vector database
- Retriever + LLM generator

## Khi nào chưa cần RAG

- Dữ liệu ít, tĩnh
- Chỉ cần FAQ đơn giản

## Kết luận

RAG phù hợp khi dữ liệu lớn và cập nhật thường xuyên.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '9 min read'
),
(
  'Tối ưu chi phí khi tích hợp LLM',
  'Các chiến lược giảm token cost mà vẫn giữ trải nghiệm tốt cho người dùng cuối.',
  'Chi phí AI tăng rất nhanh nếu không kiểm soát tốt request.

## Chiến lược tối ưu

- Caching theo intent
- Giới hạn context window hợp lý
- Chọn model theo từng tác vụ
- Fallback sang flow rule-based khi cần

## Monitoring

Theo dõi usage, latency, và tỷ lệ fallback hàng ngày.

## Kết luận

Chi phí thấp + trải nghiệm tốt là hoàn toàn khả thi nếu thiết kế từ đầu.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '8 min read'
),
(
  'AI Search cho Blog: semantic search thực chiến',
  'Nâng cấp search blog từ keyword sang semantic để tìm đúng ý hơn.',
  'Semantic search giúp người dùng tìm bài theo ý định, không phụ thuộc đúng keyword.

## Ý tưởng chính

- Tạo embedding cho title + excerpt + content
- Lưu vector vào DB phù hợp
- Query top-k theo cosine similarity

## Kết luận

Phù hợp cho blog có nhiều nội dung chuyên môn.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '7 min read'
),
(
  'Thiết kế prompt library cho team frontend',
  'Chuẩn hoá prompt theo template giúp team tái sử dụng nhanh và ổn định output.',
  'Prompt library giảm thời gian onboarding và hạn chế prompt rời rạc.

## Thành phần

- Template theo use-case
- Versioning prompt
- Evaluation checklist

## Kết luận

Nên coi prompt như một phần của codebase.',
  'https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '6 min read'
),
(
  'Guardrails cho AI assistant trong production',
  'Những lớp bảo vệ quan trọng để AI trả lời an toàn và đúng phạm vi.',
  'Khi AI lên production, guardrails là bắt buộc.

## Các lớp guardrails

- Input moderation
- Output filtering
- Intent routing
- Escalation sang human support

## Kết luận

An toàn và trải nghiệm phải đi cùng nhau.',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '8 min read'
),
(
  'Tích hợp AI vào admin dashboard mà không phá UX',
  'Cách đặt AI đúng chỗ trong dashboard để tăng hiệu quả thao tác.',
  'AI trong dashboard nên hỗ trợ quyết định, không chiếm quyền điều khiển.

## Điểm đặt AI hợp lý

- Gợi ý filter
- Tóm tắt dữ liệu nhanh
- Hỗ trợ viết nội dung

## Kết luận

UX tốt khi AI “assist”, không “intrude”.',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '5 min read'
),
(
  'A/B testing cho tính năng AI',
  'Đo lường đúng để biết AI feature có thực sự tạo giá trị hay không.',
  'Không nên ship AI chỉ vì trend, hãy đo impact rõ ràng.

## KPI gợi ý

- Task completion time
- Conversion rate
- User satisfaction

## Kết luận

AI feature phải chứng minh được hiệu quả bằng dữ liệu.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '6 min read'
),
(
  'Multi-model strategy: khi nào dùng model nào?',
  'Kết hợp nhiều model cho từng tác vụ để tối ưu chi phí và độ trễ.',
  'Một model không phù hợp cho mọi bài toán.

## Mapping tác vụ

- FAQ: model nhỏ, nhanh
- Summarize: model trung bình
- Complex reasoning: model lớn

## Kết luận

Routing đúng giúp cân bằng cost/quality.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '7 min read'
),
(
  'LLMOps cơ bản cho team sản phẩm nhỏ',
  'Thiết lập pipeline tối thiểu để theo dõi prompt, model, và chất lượng phản hồi.',
  'LLMOps không cần quá lớn ngay từ đầu.

## Bản tối thiểu

- Prompt versioning
- Logging hội thoại
- Human review samples

## Kết luận

Quy trình nhỏ nhưng đều đặn sẽ tạo khác biệt lớn.',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '8 min read'
),
(
  'From FAQ Bot to AI Agent: lộ trình nâng cấp',
  'Lộ trình từng bước để nâng chatbot FAQ thành AI agent hữu ích.',
  'Bắt đầu từ FAQ là lựa chọn an toàn.

## Lộ trình

1. FAQ static
2. FAQ + retrieval
3. Tool calling
4. Agent workflow

## Kết luận

Nâng cấp từng bước giúp kiểm soát rủi ro tốt hơn.',
  'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '9 min read'
),
(
  'Prompt injection: nhận diện và phòng tránh',
  'Những kỹ thuật cơ bản để giảm rủi ro prompt injection trong ứng dụng AI.',
  'Prompt injection là rủi ro thực tế trong ứng dụng public.

## Biện pháp

- Input sanitization
- Policy layer độc lập
- Context isolation

## Kết luận

Security phải là tiêu chí ngay từ bản MVP.',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '6 min read'
),
(
  'Xây dựng AI feature có thể demo trong 1 tuần',
  'Playbook triển khai nhanh một AI feature nhỏ để validate nhu cầu người dùng.',
  'Bạn không cần làm hệ thống lớn để chứng minh giá trị AI.

## Checklist 7 ngày

- Ngày 1-2: chọn use-case
- Ngày 3-4: dựng flow + prompt
- Ngày 5-6: test và refine
- Ngày 7: demo và đo lường

## Kết luận

Ship nhanh, học nhanh, cải tiến nhanh.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
  'AI',
  'Phan Tiến Đạt',
  '5 min read'
);
