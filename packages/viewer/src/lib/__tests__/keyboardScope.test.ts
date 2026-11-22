import { describe, expect, it } from 'vitest';

import { shouldHandleKeyboardEvent } from '../keyboardScope';

// Minimal elements: only `contains` is used
function createElement(children: object[] = []) {
    const element = {
        contains: (other: object) => other === element || children.includes(other),
    };
    return element as unknown as Element;
}

describe('shouldHandleKeyboardEvent', () => {
    const body = createElement();
    const buttonA = createElement();
    const viewerA = createElement([buttonA]);
    const viewerB = createElement();
    const hostInput = createElement();

    it('handles every key when not scoped (as before)', () => {
        expect(shouldHandleKeyboardEvent({ scope: null, activeElement: hostInput, body })).toBe(
            true,
        );
    });

    it('handles the keys when the focus is in the viewer', () => {
        expect(
            shouldHandleKeyboardEvent({ scope: viewerA, activeElement: buttonA, body, last: null }),
        ).toBe(true);
        expect(
            shouldHandleKeyboardEvent({ scope: viewerB, activeElement: buttonA, body, last: null }),
        ).toBe(false);
    });

    it('ignores the keys when the focus is elsewhere in the host page', () => {
        expect(
            shouldHandleKeyboardEvent({
                scope: viewerA,
                activeElement: hostInput,
                body,
                last: viewerA,
                scopesCount: 1,
            }),
        ).toBe(false);
    });

    it('without focus, the only viewer of the page responds (as before)', () => {
        expect(
            shouldHandleKeyboardEvent({
                scope: viewerA,
                activeElement: body,
                body,
                last: null,
                scopesCount: 1,
            }),
        ).toBe(true);
    });

    it('without focus and several viewers, only the last one used responds', () => {
        const args = { activeElement: body, body, scopesCount: 2 };
        expect(shouldHandleKeyboardEvent({ ...args, scope: viewerA, last: viewerB })).toBe(false);
        expect(shouldHandleKeyboardEvent({ ...args, scope: viewerB, last: viewerB })).toBe(true);
        expect(shouldHandleKeyboardEvent({ ...args, scope: viewerA, last: null })).toBe(false);
    });
});
