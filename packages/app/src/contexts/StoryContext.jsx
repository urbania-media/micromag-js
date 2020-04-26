/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

const StoryContext = React.createContext(null);

export const useStory = () => {
    const { story } = useContext(StoryContext);
    return story;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    story: MicromagPropTypes.story,
};

const defaultProps = {
    story: null,
};

export const StoryProvider = ({ story: initialStory, children }) => {
    const [story, setStory] = useState(initialStory);
    useEffect(() => {
        if (initialStory !== story) {
            setStory(initialStory);
        }
    }, [initialStory]);
    return (
        <StoryContext.Provider value={{ story, setStory }}>
            {children}
        </StoryContext.Provider>
    );
};

StoryProvider.propTypes = propTypes;
StoryProvider.defaultProps = defaultProps;

export default StoryContext;
