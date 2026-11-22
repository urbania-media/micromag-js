// Tolerance for scrollbars and rounding when comparing the viewer to the viewport
const VIEWPORT_TOLERANCE = 20;

/**
 * Whether the viewer takes the whole viewport (full page viewer), as opposed to a viewer embedded
 * in a smaller container of the host page
 */
function getViewerFillsViewport(
    width: number | null,
    height: number | null,
    viewport: { width: number; height: number } | null = typeof window !== 'undefined'
        ? { width: window.innerWidth, height: window.innerHeight }
        : null,
): boolean {
    if (viewport === null || width === null || height === null || width <= 0 || height <= 0) {
        return false;
    }
    return (
        width >= viewport.width - VIEWPORT_TOLERANCE &&
        height >= viewport.height - VIEWPORT_TOLERANCE
    );
}

export default getViewerFillsViewport;
