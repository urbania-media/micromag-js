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
    const buttonB = createElement();
    const viewerA = createElement([buttonA]);
    const viewerB = createElement([buttonB]);
    const hostLink = createElement();

    it('handles every key when not scoped (as before)', () => {
        expect(shouldHandleKeyboardEvent({ scope: null, activeElement: hostLink, body })).toBe(
            true,
        );
    });

    describe('a single viewer on the page (same as before)', () => {
        const single = { scope: viewerA, body, last: null, otherScopes: [] };

        it('responds when the focus is in the viewer', () => {
            expect(shouldHandleKeyboardEvent({ ...single, activeElement: buttonA })).toBe(true);
        });

        it('responds when nothing has the focus', () => {
            expect(shouldHandleKeyboardEvent({ ...single, activeElement: body })).toBe(true);
            expect(shouldHandleKeyboardEvent({ ...single, activeElement: null })).toBe(true);
        });

        it('responds when the focus is on an element of the host page', () => {
            expect(shouldHandleKeyboardEvent({ ...single, activeElement: hostLink })).toBe(true);
            expect(
                shouldHandleKeyboardEvent({ ...single, activeElement: hostLink, last: viewerA }),
            ).toBe(true);
        });
    });

    describe('several viewers on the page', () => {
        it('only the viewer holding the focus responds', () => {
            const args = { activeElement: buttonA, body, last: viewerB };
            expect(
                shouldHandleKeyboardEvent({ ...args, scope: viewerA, otherScopes: [viewerB] }),
            ).toBe(true);
            expect(
                shouldHandleKeyboardEvent({ ...args, scope: viewerB, otherScopes: [viewerA] }),
            ).toBe(false);
        });

        it('focus in the host page or nowhere: the last viewer used responds', () => {
            for (const activeElement of [body, hostLink]) {
                const args = { activeElement, body, last: viewerB };
                expect(
                    shouldHandleKeyboardEvent({ ...args, scope: viewerA, otherScopes: [viewerB] }),
                ).toBe(false);
                expect(
                    shouldHandleKeyboardEvent({ ...args, scope: viewerB, otherScopes: [viewerA] }),
                ).toBe(true);
            }
        });

        it('no viewer used yet: none responds', () => {
            expect(
                shouldHandleKeyboardEvent({
                    scope: viewerA,
                    activeElement: hostLink,
                    body,
                    last: null,
                    otherScopes: [viewerB],
                }),
            ).toBe(false);
        });
    });
});
