/**
 * When the current screen becomes inert while it holds the keyboard focus, the browser moves the
 * focus to the body. The screen remembers it, so the new current screen can take the focus back.
 */

// Focus lost this long ago (or less) is still moved to the new screen
const FOCUS_LOSS_DELAY = 500;

let lastLoss: { frame: Element | null; time: number } | null = null;

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

export function rememberFocusLoss(frame: Element | null, time: number = now()) {
    lastLoss = { frame, time };
}

export function focusLostFromScreens(
    frame: Element | null,
    {
        activeElement = typeof document !== 'undefined' ? document.activeElement : null,
        body = typeof document !== 'undefined' ? document.body : null,
        time = now(),
    }: { activeElement?: Element | null; body?: Element | null; time?: number } = {},
): boolean {
    const loss = lastLoss;
    if (loss === null || frame === null || loss.frame !== frame) {
        return false;
    }
    lastLoss = null;
    const focusIsLost = activeElement === null || activeElement === body;
    return focusIsLost && time - loss.time <= FOCUS_LOSS_DELAY;
}
