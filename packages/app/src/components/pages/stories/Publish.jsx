import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { useUrlGenerator } from '@micromag/core/contexts';
import { useStory } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StorySidebar from '../../sidebars/Story';
import PublishForm from '../../forms/StoryPublish';
import RecentPublications from '../../partials/RecentPublications';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryPublishPage = ({ location: { pathname }, className }) => {
    const url = useUrlGenerator();
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);

    const parent = story !== null ? story.title : null;
    const parentUrl = story !== null ? url('stories.show', { story: story.id }) : null;
    const title = <FormattedMessage defaultMessage="Publish" descrition="Page title" />;

    return (
        <MainLayout
            nav={[
                { label: parent, url: parentUrl },
                { label: title, url: pathname },
            ]}
        >
            <Page
                title={title}
                sidebar={story !== null ? <StorySidebar story={story} /> : <div />}
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
