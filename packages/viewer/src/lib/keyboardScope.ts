/**
 * Keyboard shortcuts listen on the window. With several viewers on one page, only the viewer the
 * reader is using must respond: the one holding the focus or, when nothing has the focus, the last
 * one the reader touched (or the only viewer of the page).
 */

export const VIEWER_SCOPE_ATTRIBUTE = 'data-micromag-viewer';

const scopes = new Map<Element, number>();
let lastScope: Element | null = null;

function onInteraction(e: Event) {
    const target = e.target instanceof Node ? e.target : null;
    lastScope = null;
    scopes.forEach((count, scope) => {
        if (target !== null && scope.contains(target)) {
            lastScope = scope;
        }
    });
}

export function registerKeyboardScope(scope: Element): () => void {
    if (scopes.size === 0 && typeof window !== 'undefined') {
        window.addEventListener('pointerdown', onInteraction, true);
        window.addEventListener('focusin', onInteraction, true);
    }
    scopes.set(scope, (scopes.get(scope) || 0) + 1);
    return () => {
        const count = (scopes.get(scope) || 1) - 1;
        if (count > 0) {
            scopes.set(scope, count);
            return;
        }
        scopes.delete(scope);
        if (scopes.size === 0 && typeof window !== 'undefined') {
            window.removeEventListener('pointerdown', onInteraction, true);
            window.removeEventListener('focusin', onInteraction, true);
        }
    };
}

export function getKeyboardScope(element: Element | null): Element | null {
    if (element === null) {
        return null;
    }
    return element.closest(`[${VIEWER_SCOPE_ATTRIBUTE}]`) || element;
}

export function shouldHandleKeyboardEvent({
    scope,
    activeElement,
    body,
    last = lastScope !== null && scopes.has(lastScope) ? lastScope : null,
    scopesCount = scopes.size,
}: {
    scope: Element | null;
    activeElement: Element | null;
    body: Element | null;
    last?: Element | null;
    scopesCount?: number;
}): boolean {
    // Not scoped: as before, every key pressed on the page
    if (scope === null) {
        return true;
    }
    if (activeElement !== null && activeElement !== body) {
        return scope.contains(activeElement);
    }
    // Nothing has the focus
    return last !== null ? last === scope : scopesCount <= 1;
}
