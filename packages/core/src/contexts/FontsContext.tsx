import { getJSON } from '@folklore/fetch';
import isString from 'lodash-es/isString';
import uniqBy from 'lodash-es/uniqBy';
import { ReactNode, createContext, use, useEffect, useState } from 'react';

import type { Font } from '../types';
import { useGoogleKeys } from './GoogleKeysContext';

export const FontsContext = createContext({
    systemFonts: null,
    googleFonts: null,
    customFonts: null,
    loadGoogleFonts: null,
});

export const useGoogleFonts = (options = null) => {
    const { disabled = false, setFonts = null, apiKey: optionsApiKey = null } = options || {};
    const { apiKey: contextApiKey } = useGoogleKeys();
    const apiKey = optionsApiKey || contextApiKey;
    const [googleFonts, setGoogleFonts] = useState(null);
    useEffect(() => {
        let canceled = false;
        if (apiKey !== null && !disabled) {
            getJSON(
                `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
            ).then(({ items = [] }) => {
                if (!canceled) {
                    const newFonts = items.map((it) => ({
                        type: 'google',
                        name: it.family,
                        variants: it.variants,
                    }));
                    if (setFonts !== null) {
                        setFonts(newFonts);
                    } else {
                        setGoogleFonts(newFonts);
                    }
                }
            });
        }
        return () => {
            canceled = true;
        };
    }, [apiKey, disabled, setFonts, setGoogleFonts]);
    return googleFonts;
};

export const useFonts = () => {
    const {
        systemFonts = null,
        googleFonts = null,
        customFonts = null,
        loadGoogleFonts = null,
    } = use(FontsContext);

    useEffect(() => {
        if (loadGoogleFonts !== null) {
            loadGoogleFonts();
        }
    }, [loadGoogleFonts]);

    return {
        systemFonts,
        googleFonts,
        customFonts,
    };
};

interface FontsProviderProps {
    children: ReactNode;
    systemFonts?: Font[];
    customFonts?: Font[];
}

export function FontsProvider({
    systemFonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'],
    customFonts = null,
    children,
}: FontsProviderProps) {
    const {
        systemFonts: previousSystemFonts = null,
        googleFonts: previousGoogleFonts = null,
        customFonts: previousCustomFonts,
        loadGoogleFonts: previousLoadGoogleFonts = null,
    } = use(FontsContext);

    const [shouldLoadGoogleFonts, setShouldLoadGoogleFonts] = useState(false);

    const googleFonts = useGoogleFonts({
        disabled:
            (previousGoogleFonts !== null && previousGoogleFonts.length > 0) ||
            !shouldLoadGoogleFonts,
    });

    const loadGoogleFonts = () => {
        setShouldLoadGoogleFonts(true);
    };

    return (
        <FontsContext
            value={{
                systemFonts: uniqBy(
                    [...(previousSystemFonts || []), ...(systemFonts || [])],
                    (font) => (isString(font) ? font : font.name),
                ),
                googleFonts: uniqBy(
                    [...(previousGoogleFonts || []), ...(googleFonts || [])],
                    (font) => (isString(font) ? font : font.name),
                ),
                customFonts: uniqBy(
                    [...(previousCustomFonts || []), ...(customFonts || [])],
                    (font) => (isString(font) ? font : font.name),
                ),
                loadGoogleFonts: previousLoadGoogleFonts || loadGoogleFonts,
            }}
        >
            {children}
        </FontsContext>
    );
}
