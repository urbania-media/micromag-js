/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/organisation/billing.module.scss';

import organisationMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.organisation.billing.title',
        defaultMessage: 'Billing',
    }
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingPage = ({ className }) => (
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
            Billing
        </Page>
    </MainLayout>
);

OrganisationBillingPage.propTypes = propTypes;
OrganisationBillingPage.defaultProps = defaultProps;

export default OrganisationBillingPage;
