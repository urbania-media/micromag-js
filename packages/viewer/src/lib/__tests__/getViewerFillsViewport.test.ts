import { describe, expect, it } from 'vitest';

import getViewerFillsViewport from '../getViewerFillsViewport';

describe('getViewerFillsViewport', () => {
    const viewport = { width: 390, height: 844 };

    it('is true for a full page viewer', () => {
        expect(getViewerFillsViewport(390, 844, viewport)).toBe(true);
        // Scrollbar or rounding
        expect(getViewerFillsViewport(375, 840, viewport)).toBe(true);
    });

    it('is false for a viewer embedded in a smaller container', () => {
        expect(getViewerFillsViewport(390, 600, viewport)).toBe(false);
        expect(getViewerFillsViewport(320, 844, viewport)).toBe(false);
    });

    it('is false before the viewer is measured, and on the server', () => {
        expect(getViewerFillsViewport(null, null, viewport)).toBe(false);
        expect(getViewerFillsViewport(0, 0, viewport)).toBe(false);
        expect(getViewerFillsViewport(390, 844, null)).toBe(false);
    });
});
