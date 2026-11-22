import { RefObject, useEffect } from 'react';

import {
    getKeyboardScope,
    registerKeyboardScope,
    shouldHandleKeyboardEvent,
} from '../lib/keyboardScope';

interface UseKeyboardShortcutsOptions {
    disabled?: boolean;
    /**
     * An element of the viewer: the shortcuts only respond when this viewer has the focus (or
     * nothing has it and this viewer is the one the reader used last)
     */
    containerRef?: RefObject<Element | null> | null;
}

function useKeyboardShortcuts(
    shortcuts = {},
    { disabled = false, containerRef = null }: UseKeyboardShortcutsOptions = {},
) {
    useEffect(() => {
        if (disabled) {
            return () => {};
        }
        const scope = containerRef !== null ? getKeyboardScope(containerRef.current) : null;
        const unregister = scope !== null ? registerKeyboardScope(scope) : null;

        const onKey = (e) => {
            if (
                ['input', 'textarea', 'select', '[contenteditable="true"]'].reduce(
                    (foundMatch, match) =>
                        foundMatch || (e.target instanceof Element && e.target.matches(match)),
                    false,
                )
            ) {
                return;
            }

            if (
                !shouldHandleKeyboardEvent({
                    scope,
                    activeElement: document.activeElement,
                    body: document.body,
                })
            ) {
                return;
            }

            const { key = '' } = e;
            const lowercaseKey = key.toLowerCase();

            if (typeof shortcuts[lowercaseKey] !== 'undefined') {
                shortcuts[lowercaseKey]();
            }
        };

        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            if (unregister !== null) {
                unregister();
            }
        };
    }, [disabled, shortcuts, containerRef]);
}

export default useKeyboardShortcuts;
