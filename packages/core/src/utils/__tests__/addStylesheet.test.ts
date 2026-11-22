import { describe, expect, test } from 'vitest';

import addStylesheet from '../addStylesheet';

const createDocument = () => {
    const head: { rel: string; href: string }[] = [];
    const doc = {
        head: {
            appendChild: (node) => {
                head.push(node);
                return node;
            },
        },
        createElement: () => {
            const link = {
                rel: '',
                href: '',
                remove: () => {
                    head.splice(head.indexOf(link), 1);
                },
            };
            return link;
        },
    };
    return { doc, head };
};

describe('addStylesheet', () => {
    test('adds one link per URL and removes it when its last user is gone', () => {
        const { doc, head } = createDocument();
        const href = 'https://fonts.test/css?family=A';
        const releaseFirst = addStylesheet(href, doc);
        const releaseSecond = addStylesheet(href, doc);
        expect(head).toEqual([expect.objectContaining({ rel: 'stylesheet', href })]);

        releaseFirst();
        releaseFirst();
        expect(head).toHaveLength(1);

        releaseSecond();
        expect(head).toHaveLength(0);

        // Added again after it was removed
        const releaseThird = addStylesheet(href, doc);
        expect(head).toHaveLength(1);
        releaseThird();
    });

    test('keeps one link per URL', () => {
        const { doc, head } = createDocument();
        const releaseA = addStylesheet('https://fonts.test/css?family=A', doc);
        const releaseB = addStylesheet('https://fonts.test/css?family=B', doc);
        expect(head.map(({ href }) => href)).toEqual([
            'https://fonts.test/css?family=A',
            'https://fonts.test/css?family=B',
        ]);
        releaseA();
        expect(head.map(({ href }) => href)).toEqual(['https://fonts.test/css?family=B']);
        releaseB();
    });

    test('does nothing without a document (server rendering)', () => {
        const release = addStylesheet('https://fonts.test/css?family=A', null);
        expect(() => release()).not.toThrow();
    });
});
