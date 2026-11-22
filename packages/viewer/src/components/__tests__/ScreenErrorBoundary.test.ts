import { describe, expect, it } from 'vitest';

import ScreenErrorBoundary, { resetKeysChanged } from '../ScreenErrorBoundary';

describe('resetKeysChanged', () => {
    it('compares the keys one by one', () => {
        const screen = { id: '1' };
        expect(resetKeysChanged([screen, 'view'], [screen, 'view'])).toBe(false);
        expect(resetKeysChanged([screen, 'view'], [{ id: '1' }, 'view'])).toBe(true);
        expect(resetKeysChanged([screen, 'view'], [screen, 'edit'])).toBe(true);
        expect(resetKeysChanged([screen], [screen, 'view'])).toBe(true);
        expect(resetKeysChanged([], [])).toBe(false);
        expect(resetKeysChanged([NaN], [NaN])).toBe(false);
    });
});

describe('ScreenErrorBoundary', () => {
    const error = new Error('Broken screen');

    it('keeps the error while the keys stay the same', () => {
        const screen = { id: '1' };
        const caught = {
            ...ScreenErrorBoundary.getDerivedStateFromError(error),
            resetKeys: [screen],
        } as { error: Error | null; resetKeys: unknown[] };
        expect(caught.error).toBe(error);
        expect(ScreenErrorBoundary.getDerivedStateFromProps({ resetKeys: [screen] }, caught)).toBe(
            null,
        );
    });

    it('resets when the screen or the story changes', () => {
        const screen = { id: '1' };
        const caught = { error, resetKeys: [screen, 'view'] };
        const changedScreen = [{ id: '1', edited: true }, 'view'];
        expect(
            ScreenErrorBoundary.getDerivedStateFromProps({ resetKeys: changedScreen }, caught),
        ).toEqual({ error: null, resetKeys: changedScreen });
    });

    it('wraps a thrown value that is not an Error', () => {
        const { error: wrapped } = ScreenErrorBoundary.getDerivedStateFromError('oops');
        expect(wrapped).toBeInstanceOf(Error);
        expect(wrapped?.message).toBe('oops');
    });
});
