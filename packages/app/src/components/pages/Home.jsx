/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisations } from '@micromag/data';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import AccountBox from '../partials/AccountBox';
import OrganisationsList from '../lists/Organisations';
import RecentStories from '../partials/RecentStories';

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
    yourOrganisation: {
        id: 'pages.home.your_organisation',
        defaultMessage: 'Your organisation',
    },
    createOrganisation: {
        id: 'pages.home.create_organisation',
        defaultMessage: 'Create an organisation',
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
    const url = useUrlGenerator();
    const { organisations } = useOrganisations();
    return (
        <MainLayout>
            <Page
                sidebar={
                    <div className="d-flex flex-column">
                        <section className="mb-4">
                            <h5 className="mb-2">
                                <Label>{messages.account}</Label>
                            </h5>
                            <AccountBox withoutHeader />
                        </section>
                        {organisations !== null ? (
                            <section>
                                {organisations.length > 0 ? (
                                    <h5 className="mb-2">
                                        <Label>
                                            {organisations.length === 1
                                                ? messages.yourOrganisation
                                                : messages.organisations}
                                        </Label>
                                    </h5>
                                ) : null}
                                <OrganisationsList items={organisations} />
                                <Button
                                    href={url('organisation.create')}
                                    theme="secondary"
                                    className={classNames([
                                        'w-100',
                                        {
                                            'mt-2': organisations.length > 0,
                                        },
                                    ])}
                                >
                                    {messages.createOrganisation}
                                </Button>
                            </section>
                        ) : null}
                    </div>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <RecentStories count={recentStoriesCount} />
            </Page>
        </MainLayout>
    );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
