import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import FontFaces from '../FontFaces';
import GoogleFonts from '../GoogleFonts';

// Same shape as the custom fonts stored in stories
const customFont = {
    type: 'custom',
    name: 'Test Sans',
    media: {
        type: 'font',
        url: 'https://cdn.test/test-sans.otf',
        files: {
            original: {
                url: 'https://cdn.test/test-sans.otf',
                name: 'test-sans.otf',
                mime: 'font/otf',
            },
            'webfonts.eot': { url: 'https://cdn.test/test-sans.eot' },
            'webfonts.svg': { url: 'https://cdn.test/test-sans.svg' },
            'webfonts.woff2': { url: 'https://cdn.test/test-sans.woff2' },
            'webfonts.woff': { url: 'https://cdn.test/test-sans.woff' },
            'webfonts.otf': { url: 'https://cdn.test/test-sans-webfont.otf' },
        },
    },
    variants: [
        {
            weight: '700',
            style: 'normal',
            media: {
                type: 'font',
                url: 'https://cdn.test/test-sans-bold.otf',
                files: { 'webfonts.woff2': { url: 'https://cdn.test/test-sans-bold.woff2' } },
            },
        },
    ],
};

const render = (props) => renderToStaticMarkup(createElement(FontFaces, props));

describe('FontFaces', () => {
    test('declares the custom fonts with font-display swap and modern formats only', () => {
        const html = render({ fonts: [customFont] });
        expect(html.match(/@font-face/g)).toHaveLength(2);
        expect(html.match(/font-display: swap;/g)).toHaveLength(2);
        expect(html).toContain('url("https://cdn.test/test-sans.woff2?") format("woff2")');
        expect(html).toContain('url("https://cdn.test/test-sans.woff?") format("woff")');
        expect(html).toContain('url("https://cdn.test/test-sans-webfont.otf?") format("opentype")');
        expect(html).toContain('font-weight: 700;');
        expect(html).not.toContain('.eot');
        expect(html).not.toContain('.svg');
        // woff2 is listed first so browsers pick it
        expect(html.indexOf('woff2')).toBeLessThan(html.indexOf('format("woff")'));
    });

    test('keeps the original file when it is the only usable one', () => {
        const html = render({
            fonts: [
                {
                    type: 'custom',
                    name: 'Original Only',
                    media: {
                        files: {
                            original: {
                                url: 'https://cdn.test/original.ttf',
                                name: 'original.ttf',
                                mime: 'font/ttf',
                            },
                        },
                    },
                },
            ],
        });
        expect(html).toContain('url("https://cdn.test/original.ttf?") format("truetype")');
    });

    test('accepts another display value or none', () => {
        expect(render({ fonts: [customFont], display: 'fallback' })).toContain(
            'font-display: fallback;',
        );
        expect(render({ fonts: [customFont], display: null })).not.toContain('font-display');
    });

    test('renders nothing without custom fonts', () => {
        expect(render({ fonts: ['Arial', { type: 'google', name: 'Roboto' }] })).toBe('');
    });
});

describe('GoogleFonts', () => {
    test('renders only the preconnects: the stylesheet is added from an effect', () => {
        const html = renderToStaticMarkup(
            createElement(GoogleFonts, {
                fonts: [{ type: 'google', name: 'Roboto', variants: ['700'] }],
            }),
        );
        expect(html).toContain('rel="preconnect" href="https://fonts.googleapis.com"');
        expect(html).toContain('rel="preconnect" href="https://fonts.gstatic.com"');
        // A stylesheet link in server-rendered HTML would make the scripts after it wait for it
        expect(html).not.toContain('stylesheet');
    });

    test('renders nothing without Google fonts', () => {
        expect(renderToStaticMarkup(createElement(GoogleFonts, { fonts: [customFont] }))).toBe('');
    });
});
