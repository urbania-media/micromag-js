/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { defineMessages } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import useStory from '../../../hooks/useStory';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/stories/stories.module.scss';

import storyMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.story.title',
        defaultMessage: 'Story',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryPage = ({ className }) => {
    const url = useUrlGenerator();
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    return (
        <MainLayout>
            <Page
                title={messages.title}
                sidebar={
                    story !== null ? (
                        <>
                            <div className={styles.actions}>
                                <Button
                                    href={url('stories.editor', {
                                        story: story.id,
                                    })}
                                    theme="primary"
                                    className={styles.button}
                                >
                                    {storyMessages.launchEditor}
                                </Button>
                            </div>
                        </>
                    ) : null
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                Story
            </Page>
        </MainLayout>
    );
};

StoryPage.propTypes = propTypes;
StoryPage.defaultProps = defaultProps;

export default StoryPage;
