import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, test } from 'vitest';

import manager from '../defaultManager';
import createLazyScreen from '../lazy/createLazyScreen';
import loaders from '../lazy/loaders';

describe('lazy screens', () => {
    test('a loader for each screen of @micromag/screens', () => {
        expect(Object.keys(loaders).sort()).toEqual(
            manager
                .getDefinitions()
                .map(({ id }) => id)
                .sort(),
        );
    });

    test('a lazy screen renders nothing until loaded, then its component', async () => {
        let resolve: (value: unknown) => void = () => {};
        let calls = 0;
        const definition = createLazyScreen('test', () => {
            calls += 1;
            return new Promise((done) => {
                resolve = done;
            });
        });
        const { component, load, isLoaded } = definition;
        expect(isLoaded?.()).toBe(false);
        expect(renderToString(createElement(component, { label: 'Hello' }))).not.toContain('Hello');

        resolve(({ label }: { label: string }) => createElement('p', null, label));
        await load?.();
        expect(calls).toBe(1);
        expect(isLoaded?.()).toBe(true);
        expect(renderToString(createElement(component, { label: 'Hello' }))).toContain('Hello');
    });

    test('a loader that fails is tried again', async () => {
        let calls = 0;
        const { load, isLoaded } = createLazyScreen('test', () => {
            calls += 1;
            return calls === 1
                ? Promise.reject(new Error('Network error'))
                : Promise.resolve(() => null);
        });
        await expect(load?.()).rejects.toThrow('Network error');
        await load?.();
        expect(calls).toBe(2);
        expect(isLoaded?.()).toBe(true);
    });
});
