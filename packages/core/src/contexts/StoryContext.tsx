import React, { ReactNode, createContext, useContext } from 'react';

import type { Story } from '../types';

export const StoryContext = createContext<Story | null>(null);

export const useStoryContext = () => useContext(StoryContext);

export const useStory = () => {
    const story = useStoryContext();
    return story;
};

interface StoryProviderProps {
    story?: Story | null;
    children: ReactNode;
}

export function StoryProvider({ story = null, children }: StoryProviderProps) {
    return <StoryContext.Provider value={story}>{children}</StoryContext.Provider>;
}
