const escapeHtml = (value = '') =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')

const renderInlineMarkdown = (value = '') =>
    escapeHtml(value)
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>')
        .replace(
            /`(.*?)`/g,
            '<code class="bg-dark-700 px-2 py-1 rounded text-accent-primary text-sm">$1</code>'
        )

export const renderSafeMarkdownPreview = (text = '') => {
    return text
        .split('\n')
        .map((line) => {
            const trimmed = line.trim()
            if (!trimmed) return ''

            if (trimmed.startsWith('#### ')) {
                return `<h4 class="text-base font-semibold text-white mt-3 mb-2">${renderInlineMarkdown(trimmed.slice(5))}</h4>`
            }

            if (trimmed.startsWith('### ')) {
                return `<h3 class="text-lg font-semibold text-white mt-4 mb-2">${renderInlineMarkdown(trimmed.slice(4))}</h3>`
            }

            if (trimmed.startsWith('## ')) {
                return `<h2 class="text-xl font-bold text-white mt-6 mb-3 pb-2 border-b border-white/10">${renderInlineMarkdown(trimmed.slice(3))}</h2>`
            }

            if (/^[-*]\s+/.test(trimmed)) {
                return `<li class="text-white/80 ml-6 my-1">${renderInlineMarkdown(trimmed.replace(/^[-*]\s+/, ''))}</li>`
            }

            if (/^-{3,}$/.test(trimmed)) {
                return '<hr class="border-white/10 my-4" />'
            }

            return `<p class="text-white/80 my-3">${renderInlineMarkdown(trimmed)}</p>`
        })
        .join('')
}
