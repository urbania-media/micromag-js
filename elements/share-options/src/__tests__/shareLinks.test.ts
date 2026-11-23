import { describe, expect, test } from 'vitest';

import {
    getEmailLink,
    getFacebookLink,
    getLinkedinLink,
    getTwitterLink,
    getWhatsappLink,
} from '../shareLinks';

// The links that react-share 5 built for the same buttons
describe('share links', () => {
    const url = 'https://example.com/story?a=1&b=2';
    const title = 'A story & more';

    test('facebook', () => {
        expect(getFacebookLink(url)).toBe(
            'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2',
        );
    });

    test('twitter', () => {
        expect(getTwitterLink(url, title)).toBe(
            'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2&text=A%20story%20%26%20more',
        );
        expect(getTwitterLink(url)).toBe(
            'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2',
        );
    });

    test('linkedin', () => {
        expect(getLinkedinLink(url, title)).toBe(
            'https://linkedin.com/shareArticle?url=https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2&mini=true&title=A%20story%20%26%20more',
        );
    });

    test('whatsapp', () => {
        expect(getWhatsappLink(url, title)).toBe(
            'https://api.whatsapp.com/send?text=A%20story%20%26%20more%20https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2',
        );
        expect(getWhatsappLink(url)).toBe(
            'https://api.whatsapp.com/send?text=https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2',
        );
    });

    test('email', () => {
        expect(getEmailLink(url, title)).toBe(
            'mailto:?subject=A%20story%20%26%20more&body=https%3A%2F%2Fexample.com%2Fstory%3Fa%3D1%26b%3D2',
        );
    });
});
