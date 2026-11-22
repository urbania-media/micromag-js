import { useEffect } from 'react';

let activeCount = 0;
let previousValue: string | null = null;

function containBodyOverscroll(): () => void {
    const { body = null } = typeof document !== 'undefined' ? document : {};
    if (body === null) {
        return () => {};
    }
    if (activeCount === 0) {
        previousValue = body.style.overscrollBehavior;
        body.style.overscrollBehavior = 'contain';
    }
    activeCount += 1;
    return () => {
        activeCount -= 1;
        if (activeCount === 0) {
            body.style.overscrollBehavior = previousValue || '';
            previousValue = null;
        }
    };
}

interface OverscrollStyleProps {
    active?: boolean;
}

/**
 * Stops the pull-to-refresh and the scroll chaining of the page while the viewer fills the
 * viewport (full page or fullscreen). A viewer embedded in a smaller container leaves the scrolling
 * of the host page alone, and the page gets its own value back when the viewer stops filling the
 * viewport or unmounts. (A hoisted `<style>` would stay in the document after unmount.)
 */
function OverscrollStyle({ active = false }: OverscrollStyleProps) {
    useEffect(() => (active ? containBodyOverscroll() : undefined), [active]);
    return null;
}

export default OverscrollStyle;
