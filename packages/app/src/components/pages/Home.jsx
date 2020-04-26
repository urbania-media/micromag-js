/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label, Button, AsyncList } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useUser } from '../../contexts/AuthContext';
import { useOrganisation } from '../../contexts/OrganisationContext';
import { useApi } from '../../contexts/ApiContext';
import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import OrganisationMenu from '../menus/Organisation';
import AccountBox from '../partials/AccountBox';
import OrganisationsList from '../lists/Organisations';
import StoriesList from '../lists/Stories';

import styles from '../../styles/pages/home.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.home.title',
        defaultMessage: 'Micromag',
    },
    account: {
        id: 'pages.home.account',
        defaultMessage: 'Your account',
    },
    organisations: {
        id: 'pages.home.organisations',
        defaultMessage: 'Your organisations',
    },
    recentStories: {
        id: 'pages.home.recent_stories',
        defaultMessage: 'Recent stories',
    },
    viewAllStories: {
        id: 'pages.home.view_all_stories',
        defaultMessage: 'View all stories',
    },
});

const propTypes = {
    recentStoriesCount: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    recentStoriesCount: 6,
    className: null,
};

const HomePage = ({ recentStoriesCount, className }) => {
    const user = useUser();
    const url = useUrlGenerator();
    const api = useApi();
    const organisation = useOrganisation();
    const getRecentStories = useCallback(() => api.stories.getRecents(recentStoriesCount), [
        api,
        recentStoriesCount,
    ]);
    return (
        <MainLayout>
            <Page
                title={organisation !== null ? organisation.name : messages.title}
                sidebar={
                    <>
                        {organisation !== null ? (
                            <section className="mb-4">
                                <OrganisationMenu
                                    withoutDropdown
                                    className="list-group"
                                    itemClassName="list-group-item"
                                />
                            </section>
                        ) : (
                            <section className="mb-4">
                                <AccountBox />
                            </section>
                        )}
                    </>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {organisation === null ? (
                    <section className="mb-4">
                        <h5 className="mb-2">
                            <Label>{messages.organisations}</Label>
                        </h5>
                        <OrganisationsList items={user.organisations} />
                    </section>
                ) : null}
                <section>
                    <h5 className="mb-2">
                        <Label>{messages.recentStories}</Label>
                    </h5>
                    <AsyncList getItems={getRecentStories}>
                        {({ items }) => (items !== null ? <StoriesList items={items} /> : null)}
                    </AsyncList>
                    <div className={classNames(['d-flex', 'mt-2'])}>
                        <Button href={url('stories')} theme="secondary">
                            {messages.viewAllStories}
                        </Button>
                    </div>
                </section>
            </Page>
        </MainLayout>
    );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
