/**
 * Keyboard shortcuts listen on the window. With several viewers on one page, only the viewer the
 * reader is using must respond: the one holding the focus or, when the focus is not in a viewer
 * (nothing focused, or an element of the host page), the last one the reader touched (or the only
 * viewer of the page). A single viewer responds as before, wherever the focus is outside it.
 */

export const VIEWER_SCOPE_ATTRIBUTE = 'data-micromag-viewer';

const scopes = new Map<Element, number>();
let lastScope: Element | null = null;

function onInteraction(e: Event) {
    const target = e.target instanceof Node ? e.target : null;
    // A click in the host page keeps the last viewer used
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
    otherScopes = [...scopes.keys()].filter((it) => it !== scope),
}: {
    scope: Element | null;
    activeElement: Element | null;
    body: Element | null;
    last?: Element | null;
    otherScopes?: Element[];
}): boolean {
    // Not scoped: as before, every key pressed on the page
    if (scope === null) {
        return true;
    }
    const withFocus = activeElement !== null && activeElement !== body;
    if (withFocus && scope.contains(activeElement)) {
        return true;
    }
    // The focus is in another viewer: that one responds
    if (withFocus && otherScopes.some((other) => other.contains(activeElement))) {
        return false;
    }
    // Nothing focused, or an element of the host page: the last viewer used, or the only one
    if (last !== null) {
        return last === scope;
    }
    return otherScopes.length === 0;
}
