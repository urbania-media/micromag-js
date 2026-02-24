import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { PropTypes as MicromagPropTypes } from '../lib';

export const StoryContext = React.createContext(null);

export const useStoryContext = () => useContext(StoryContext);

export const useStory = () => {
    const story = useStoryContext();
    return story;
};

const propTypes = {
    story: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    children: PropTypes.node.isRequired,
};

export const StoryProvider = ({ story = null, children }) => (
    <StoryContext.Provider value={story}>{children}</StoryContext.Provider>
);

StoryProvider.propTypes = propTypes;
