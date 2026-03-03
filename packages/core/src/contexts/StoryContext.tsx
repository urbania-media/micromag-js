import React, { useContext } from 'react';
import type { Story, Theme } from '../lib';
export const StoryContext = React.createContext(null);

export const useStoryContext = () => useContext(StoryContext);

export const useStory = () => {
    const story = useStoryContext();
    return story;
};

interface StoryProviderProps {
    story?: Story | Theme;
    children: React.ReactNode;
}

export const StoryProvider = ({ story = null, children }) => (
    <StoryContext.Provider value={story}>{children}</StoryContext.Provider>
);

