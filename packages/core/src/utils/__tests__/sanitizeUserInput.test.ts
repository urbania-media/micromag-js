import { beforeEach, describe, expect, test, vi } from 'vitest';

const sanitize = vi.fn((value: string) => `sanitized:${value}`);

vi.mock('dompurify', () => ({
    default: { isSupported: true, sanitize },
}));

describe('sanitizeUserInput', () => {
    beforeEach(() => {
        vi.resetModules();
        sanitize.mockClear();
    });

    test('strips markup before DOMPurify is loaded', async () => {
        const { default: sanitizeUserInput } = await import('../sanitizeUserInput');
        expect(sanitizeUserInput('<img src=x onerror=alert(1)>Hello <b>you</b>')).toBe(
            'img src=x onerror=alert(1)Hello byou/b',
        );
        expect(sanitize).not.toHaveBeenCalled();
    });

    test('uses DOMPurify once loaded', async () => {
        const { default: sanitizeUserInput, loadUserInputSanitizer } =
            await import('../sanitizeUserInput');
        const loaded = await loadUserInputSanitizer();
        expect(loaded('<b>a</b>')).toBe('sanitized:<b>a</b>');
        expect(sanitizeUserInput('<b>b</b>')).toBe('sanitized:<b>b</b>');
        expect(sanitize).toHaveBeenCalledTimes(2);
    });

    test('keeps stripping markup when DOMPurify is not supported (no DOM)', async () => {
        vi.doMock('dompurify', () => ({ default: { isSupported: false } }));
        const { default: sanitizeUserInput, loadUserInputSanitizer } =
            await import('../sanitizeUserInput');
        await loadUserInputSanitizer();
        expect(sanitizeUserInput('<script>x</script>')).toBe('scriptx/script');
        vi.doUnmock('dompurify');
    });
});
