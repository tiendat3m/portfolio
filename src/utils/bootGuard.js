// Session guard for the boot sequence. Keeps the file component-only so
// Fast Refresh stays happy (no non-component exports beside the component).
const BOOT_KEY = 'portfolio:bootPlayed'

/**
 * Returns true the first time the boot should play in a browser session.
 * Subsequent loads in the same session (route/section changes) skip it.
 * Reduced-motion users always skip.
 */
export const shouldRunBootSequence = () => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem(BOOT_KEY)) return false
    sessionStorage.setItem(BOOT_KEY, '1')
    return true
}