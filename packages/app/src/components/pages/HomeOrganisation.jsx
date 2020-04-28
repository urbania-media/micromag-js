/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label } from '@micromag/core/components';

import { useOrganisation } from '../../contexts/OrganisationContext';
import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import OrganisationBox from '../partials/OrganisationBox';
import AccountBox from '../partials/AccountBox';
import RecentStories from '../partials/RecentStories';

import styles from '../../styles/pages/home.module.scss';

const messages = defineMessages({
    account: {
        id: 'pages.home.account',
        defaultMessage: 'Your account',
    },
    organisation: {
        id: 'pages.home.organisation',
        defaultMessage: 'Organisation',
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

const HomeOrganisationPage = ({ recentStoriesCount, className }) => {
    const organisation = useOrganisation();
    return (
        <MainLayout>
            <Page
                title={organisation.name}
                sidebar={
                    <>
                        <section className="mb-4">
                            <h5 className="mb-2">
                                <Label>{messages.organisation}</Label>
                            </h5>
                            <OrganisationBox organisation={organisation} withoutHeader />
                        </section>
                        <section className="mb-4">
                            <h5 className="mb-2">
                                <Label>{messages.account}</Label>
                            </h5>
                            <AccountBox withoutHeader />
                        </section>
                    </>
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

HomeOrganisationPage.propTypes = propTypes;
HomeOrganisationPage.defaultProps = defaultProps;

export default HomeOrganisationPage;
