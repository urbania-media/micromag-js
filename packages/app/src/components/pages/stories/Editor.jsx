/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useParams } from 'react-router';
import Editor from '@micromag/editor';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStory, useUpdateStory } from '@micromag/data';

import EditorNavbar from '../../navbars/Editor';
import MainLayout from '../../layouts/Main';

import styles from '../../../styles/pages/stories/editor.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const EditorPage = ({ className }) => {
    const { story: storyId } = useParams();
    const url = useUrlGenerator();
    const { story } = useStory(storyId);
    const { updateStory, updating } = useUpdateStory(storyId);
    const [editorStory, setEditorStory] = useState(story);
    const onClickSave = useCallback(
        () => updateStory(editorStory).then(newStory => setEditorStory(newStory)),
        [updateStory, editorStory, setEditorStory],
    );
    useEffect(() => {
        if (story !== editorStory) {
            setEditorStory(story);
        }
    }, [story]);
    return (
        <MainLayout
            isEditor
            navbar={
                <EditorNavbar story={editorStory} onClickSave={onClickSave} saving={updating} />
            }
        >
            <div
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {editorStory !== null ? (
                    <Editor
                        story={editorStory}
                        className={styles.editor}
                        basePath={url('stories.editor', {
                            story: story.id,
                        })}
                        fullscreen
                        memoryRouter
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
