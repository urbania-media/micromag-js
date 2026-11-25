import { describe, expect, it } from 'vitest';

import getQuizResult from '../getQuizResult';

const results = [
    { id: 'high', points: 8 },
    { id: 'low', points: 0 },
    { id: 'medium', points: 4 },
];

describe('getQuizResult', () => {
    it('gives the result with the most points that the points reach', () => {
        expect(getQuizResult(results, 0)?.id).toBe('low');
        expect(getQuizResult(results, 5)?.id).toBe('medium');
        expect(getQuizResult(results, 8)?.id).toBe('high');
        expect(getQuizResult(results, 12)?.id).toBe('high');
    });

    it('gives null when the points reach no result', () => {
        expect(getQuizResult([{ id: 'only', points: 4 }], 2)).toBe(null);
        expect(getQuizResult(null, 2)).toBe(null);
    });

    it('does not sort the results in place', () => {
        const list = [...results];
        getQuizResult(list, 4);
        expect(list.map(({ id }) => id)).toEqual(['high', 'low', 'medium']);
    });
});
