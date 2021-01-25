/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '../lib';

const StoryContext = React.createContext({
    story: null,
});

export const useStory = () => useContext(StoryContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    story: MicromagPropTypes.story,
};

const defaultProps = {
    story: null,
};

export const StoryProvider = ({ story, children }) => <StoryContext.Provider value={story}>{children}</StoryContext.Provider>;

StoryProvider.propTypes = propTypes;
StoryProvider.defaultProps = defaultProps;

export default StoryContext;
