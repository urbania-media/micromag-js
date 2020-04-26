/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/organisation/settings.module.scss';

import organisationMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.organisation.settings.title',
        defaultMessage: 'Billing',
    }
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsPage = ({ className }) => (
    <MainLayout>
        <Page
            section={organisationMessages.title}
            title={messages.title}
            sidebar="sidebar"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Settings
        </Page>
    </MainLayout>
);

OrganisationSettingsPage.propTypes = propTypes;
OrganisationSettingsPage.defaultProps = defaultProps;

export default OrganisationSettingsPage;
