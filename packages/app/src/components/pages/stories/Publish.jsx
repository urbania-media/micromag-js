/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { useStory } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryBox from '../../partials/StoryBox';
import PublishForm from '../../forms/StoryPublish';
import RecentPublications from '../../partials/RecentPublications';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryPublishPage = ({ className }) => {
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Publish" description="Publish page title" />
                }
                title={story !== null ? story.title : null}
                sidebar={story !== null ? <StoryBox story={story} /> : <div />}
                className={className}
            >
                {story !== null ? (
                    <>
                        <PublishForm story={story} />
                        <RecentPublications story={story} />
                    </>
                ) : null}
            </Page>
        </MainLayout>
    );
};

StoryPublishPage.propTypes = propTypes;
StoryPublishPage.defaultProps = defaultProps;

export default StoryPublishPage;
