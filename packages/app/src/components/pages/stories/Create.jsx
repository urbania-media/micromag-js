/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label, FormPanel } from '@micromag/core/components';
import { useRoutePush } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryCreateForm from '../../forms/StoryCreate';

import styles from '../../../styles/pages/stories/create.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.stories.create.title',
        defaultMessage: 'Create a story',
    },
    description: {
        id: 'pages.stories.create.description',
        defaultMessage: 'A description',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoriesCreatePage = ({ className }) => {
    const push = useRoutePush();
    const onCreated = useCallback(
        story => {
            push('stories.show', {
                story: story.id,
            });
        },
        [push],
    );
    return (
        <MainLayout contentAlign="middle">
            <Page
                title={messages.title}
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <StoryCreateForm onCreated={onCreated} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

StoriesCreatePage.propTypes = propTypes;
StoriesCreatePage.defaultProps = defaultProps;

export default StoriesCreatePage;
