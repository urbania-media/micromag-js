import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import { ReactNode, createContext, use } from 'react';

import { MediasParser } from '../lib';

import type { Font, Media, Story } from '../types';

export const StoryContext = createContext<{
    story: Story | null;
    getFont: (fontName: Font) => Font | null;
    getMedia: <T = Media>(mediaName: T | string) => T | null;
}>({
    story: null,
    getFont: (fontName) => fontName,
    getMedia: (mediaName) => (isObject(mediaName) ? mediaName : null),
});

export const useStoryContext = () => use(StoryContext);

export const useStory = () => {
    const { story } = useStoryContext();
    return story;
};

export function useStoryFont(): (fontName: string) => Font;
export function useStoryFont(fontName: Font): Font | null;
export function useStoryFont(fontName: Font = null): Font | null | ((fontName: string) => Font) {
    const { getFont } = useStoryContext();
    return fontName !== null ? getFont(fontName) : getFont;
}

export function useStoryMedia<T = Media>(): (mediaName: T | string) => T;
export function useStoryMedia<T = Media>(mediaName: T | string): T | null;
export function useStoryMedia<T = Media>(
    mediaName: T | string = null,
): T | null | ((mediaName: string) => T | null) {
    const { getMedia } = useStoryContext();
    return mediaName !== null ? getMedia<T>(mediaName) : getMedia<T>;
}

interface StoryProviderProps {
    story?: Story | null;
    children: ReactNode;
}

export function StoryProvider({ story = null, children }: StoryProviderProps) {
    const getFont = (fontName: Font): Font | null => {
        if (isObject(fontName)) {
            return fontName;
        }
        const { fonts = [] } = story || {};
        const fontsArray = isArray(fonts) ? fonts : Object.keys(fonts).map((key) => fonts[key]);
        return fontsArray.find((font) => font.name === fontName) ?? fontName;
    };

    function getMedia<T = Media>(mediaName: T | string): T | null {
        if (isObject(mediaName)) {
            return mediaName;
        }
        const { medias = [] } = story || {};
        const mediasArray = isArray(medias)
            ? medias
            : Object.keys(medias).map((key) => medias[key]);
        return mediasArray.find((media) => MediasParser.getMediaPath(media) === mediaName) ?? null;
    }
    return <StoryContext value={{ story, getFont, getMedia }}>{children}</StoryContext>;
}
