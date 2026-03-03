import { useEffect } from 'react';

function useKeyboardShortcuts(shortcuts = {}, { disabled = false } = {}) {
    useEffect(() => {
        const onKey = (e) => {
            if (
                ['input', 'textarea'].reduce(
                    (foundMatch, match) => foundMatch || e.target.matches(match),
                    false,
                )
            ) {
                return;
            }

            const { key } = e;
            const lowercaseKey = key.toLowerCase();

            if (typeof shortcuts[lowercaseKey] !== 'undefined') {
                shortcuts[lowercaseKey]();
            }
        };

        if (!disabled) {
            window.addEventListener('keydown', onKey);
        }
        return () => {
            if (!disabled) {
                window.removeEventListener('keydown', onKey);
            }
        };
    }, [disabled, shortcuts]);
}

export default useKeyboardShortcuts;
