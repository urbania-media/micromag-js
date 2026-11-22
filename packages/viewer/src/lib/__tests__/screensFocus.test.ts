import { describe, expect, it } from 'vitest';

import { focusLostFromScreens, rememberFocusLoss } from '../screensFocus';

describe('screensFocus', () => {
    const frame = {} as Element;
    const body = {} as Element;
    const button = {} as Element;

    it('moves the focus when the previous screen just lost it', () => {
        rememberFocusLoss(frame, 1000);
        expect(focusLostFromScreens(frame, { activeElement: body, body, time: 1050 })).toBe(true);
        // Only once
        expect(focusLostFromScreens(frame, { activeElement: body, body, time: 1060 })).toBe(false);
    });

    it('leaves the focus alone when it went somewhere else', () => {
        rememberFocusLoss(frame, 1000);
        expect(focusLostFromScreens(frame, { activeElement: button, body, time: 1050 })).toBe(
            false,
        );
    });

    it('ignores an old loss or another viewer', () => {
        rememberFocusLoss(frame, 1000);
        expect(focusLostFromScreens(frame, { activeElement: body, body, time: 3000 })).toBe(false);
        rememberFocusLoss(frame, 1000);
        expect(focusLostFromScreens({} as Element, { activeElement: body, body, time: 1010 })).toBe(
            false,
        );
    });
});
