import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import { ColorsParser } from '../lib';
import { useFieldsManager } from './FieldsContext';
import { useScreensManager } from './ScreensContext';
import { useStory } from './StoryContext';

export const EditorContext = React.createContext(null);

export const useEditor = () => useContext(EditorContext);

export const useGetColors = () => {
    const { getColors = () => [] } = useEditor() || {};
    return getColors;
};

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

export const EditorProvider = ({ children }) => {
    const story = useStory();
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();

    const parser = useMemo(
        () =>
            new ColorsParser({
                screensManager,
                fieldsManager,
            }),
        [screensManager, fieldsManager],
    );
    const parse = useCallback((currentStory) => parser.parse(currentStory), [parser]);
    const getColors = useCallback(() => parse(story), [parse, story]);

    return <EditorContext.Provider value={{ getColors }}>{children}</EditorContext.Provider>;
};

EditorProvider.propTypes = propTypes;
EditorProvider.defaultProps = defaultProps;
