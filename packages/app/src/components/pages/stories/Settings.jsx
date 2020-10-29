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

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StorySettingsPage = ({ className }) => {
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Settings" description="Settings page title" />
                }
                title={story !== null ? story.title : null}
                sidebar={story !== null ? <StoryBox story={story} /> : <div />}
                className={className}
            >
                Story settings
            </Page>
        </MainLayout>
    );
};

StorySettingsPage.propTypes = propTypes;
StorySettingsPage.defaultProps = defaultProps;

export default StorySettingsPage;
