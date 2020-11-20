/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import Editor from '@micromag/editor';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStory, useStoryVersionCreate } from '@micromag/data';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useApp } from '../../../contexts/AppContext';
import StoryNavbar from '../../navbars/Story';
import EditorNavbar from '../../navbars/Editor';
import MainLayout from '../../layouts/Main';

const propTypes = {
    // location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ThemeEditorPage = ({ className }) => {
    const url = useUrlGenerator();
    const { memoryRouter } = useApp();
    const { theme: themeId } = useParams();

    const { theme } = useStory(themeId);
    const { create: createStoryVersion, creating } = useStoryVersionCreate(themeId);
    const [editorTheme, setEditorTheme] = useState(theme);

    const onClickSave = useCallback(() => {
        const { components = [] } = editorTheme;
        const versionData = {
            components,
        };
        return createStoryVersion(versionData).then(({ id, ...newVersion }) =>
            setEditorTheme({
                ...editorTheme,
                ...newVersion,
            }),
        );
    }, [createStoryVersion, editorTheme, setEditorTheme]);

    useEffect(() => {
        if (theme !== editorTheme) {
            setEditorTheme(theme);
        }
    }, [theme]);

    return (
        <MainLayout
            fullscreen
            navbar={
                <>
                    <EditorNavbar story={editorTheme} onClickSave={onClickSave} saving={creating} />
                    <StoryNavbar story={editorTheme} />
                </>
            }
        >
            <div className={className}>
                {editorTheme !== null ? (
                    <Editor
                        story={editorTheme}
                        basePath={url('themes.editor', {
                            theme: theme ? theme.id : null,
                        })}
                        memoryRouter={memoryRouter}
                        fullscreen
                        onChange={setEditorTheme}
                    />
                ) : null}
            </div>
        </MainLayout>
    );
};

ThemeEditorPage.propTypes = propTypes;
ThemeEditorPage.defaultProps = defaultProps;

export default ThemeEditorPage;
