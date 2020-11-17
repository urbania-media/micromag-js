/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useRoutePush } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryCreateForm from '../../forms/StoryCreate';
import StoryCreateThemesForm from '../../forms/StoryCreateThemes';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/stories/create.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoriesCreatePage = ({ className }) => {
    const organisation = useContextOrganisation();
    const push = useRoutePush();
    const onCreated = useCallback(
        (story) => {
            push('stories.show', {
                story: story.id,
            });
        },
        [push],
    );
    return (
        <MainLayout contentAlign="middle">
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Create a story"
                        description="Create a story page title"
                    />
                }
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    {organisation ? (
                        <StoryCreateThemesForm
                            organisation={organisation || null}
                            onCreated={onCreated}
                        />
                    ) : (
                        <StoryCreateForm onCreated={onCreated} />
                    )}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

StoriesCreatePage.propTypes = propTypes;
StoriesCreatePage.defaultProps = defaultProps;

export default StoriesCreatePage;
