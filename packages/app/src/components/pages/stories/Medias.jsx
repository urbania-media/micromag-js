import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { useStory } from '@micromag/data';
import MediaGallery from '@micromag/media-gallery';
import { FormPanel } from '@micromag/core/components';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryBox from '../../partials/StoryBox';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryMediasPage = ({ className }) => {
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Medias" description="Medias page title" />
                }
                title={story !== null ? story.title : null}
                sidebar={story !== null ? <StoryBox story={story} /> : <div />}
                className={className}
            >
                <FormPanel>
                    {story !== null ? (
                        <MediaGallery source="all" withoutSource withoutTitle />
                    ) : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

StoryMediasPage.propTypes = propTypes;
StoryMediasPage.defaultProps = defaultProps;

export default StoryMediasPage;
