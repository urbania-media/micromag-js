import React, { useContext } from 'react';
import PropTypes from 'prop-types';

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

const defaultProps = {
    story: null,
};

export const StoryProvider = ({ story, children }) => (
    <StoryContext.Provider value={story}>{children}</StoryContext.Provider>
);

StoryProvider.propTypes = propTypes;
StoryProvider.defaultProps = defaultProps;
