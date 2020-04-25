/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useParams } from 'react-router';
import Editor from '@micromag/editor';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useApi } from '../../../contexts/ApiContext';

import styles from '../../../styles/pages/stories/editor.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const EditorPage = ({ className }) => {
    const { story: storyId } = useParams();
    const [story, setStory] = useState(null);
    const api = useApi();
    const url = useUrlGenerator();
    useEffect(() => {
        let canceled = false;
        api.stories.find(storyId).then(newStory => {
            if (!canceled) {
                setStory(newStory);
            }
        });
        return () => {
            canceled = true;
        };
    }, [storyId, setStory]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {story !== null ? (
                <Editor
                    story={story}
                    className={styles.editor}
                    basePath={url('stories.editor', {
                        story: story.id,
                    })}
                    memoryRouter
                    onChange={setStory}
                />
            ) : null}
        </div>
    );
};

EditorPage.propTypes = propTypes;
EditorPage.defaultProps = defaultProps;

export default EditorPage;
