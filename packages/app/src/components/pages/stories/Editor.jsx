/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import Editor from '@micromag/editor';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStory, useStoryVersionCreate } from '@micromag/data';

import { useApp } from '../../../contexts/AppContext';
import EditorNavbar from '../../navbars/Editor';
import MainLayout from '../../layouts/Main';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const EditorPage = ({ className }) => {
    const { memoryRouter } = useApp();
    const { story: storyId } = useParams();
    const url = useUrlGenerator();
    const { story } = useStory(storyId);
    const { create: createStoryVersion, creating } = useStoryVersionCreate(storyId);
    const [editorStory, setEditorStory] = useState(story);
    const onClickSave = useCallback(() => {
        const { components = [] } = editorStory;
        const versionData = {
            components,
        };
        return createStoryVersion(versionData).then(({ id, ...newVersion }) =>
            setEditorStory({
                ...editorStory,
                ...newVersion,
            }),
        );
    }, [createStoryVersion, editorStory, setEditorStory]);
    useEffect(() => {
        if (story !== editorStory) {
            setEditorStory(story);
        }
    }, [story]);
    return (
        <MainLayout
            isEditor
            navbar={
                <EditorNavbar story={editorStory} onClickSave={onClickSave} saving={creating} />
            }
        >
            <div className={className}>
                {editorStory !== null ? (
                    <Editor
                        story={editorStory}
                        basePath={url('stories.editor', {
                            story: story.id,
                        })}
                        memoryRouter={memoryRouter}
                        fullscreen
                        onChange={setEditorStory}
                    />
                ) : null}
            </div>
        </MainLayout>
    );
};

EditorPage.propTypes = propTypes;
EditorPage.defaultProps = defaultProps;

export default EditorPage;
