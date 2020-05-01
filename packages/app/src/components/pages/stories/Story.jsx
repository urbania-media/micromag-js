/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import { defineMessages } from 'react-intl';
import { Screens } from '@micromag/editor';
import { ScreensProvider } from '@micromag/screens';
import { useStory } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryBox from '../../partials/StoryBox';

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
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    return (
        <MainLayout>
            <Page
                section={messages.title}
                title={story !== null ? story.title : null}
                sidebar={story !== null ? <StoryBox story={story} /> : <div />}
                className={className}
            >
                <ScreensProvider>
                    {story !== null ? <Screens items={story.components || []} withPreview /> : null}
                </ScreensProvider>
            </Page>
        </MainLayout>
    );
};

StoryPage.propTypes = propTypes;
StoryPage.defaultProps = defaultProps;

export default StoryPage;
