/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';

import styles from '../../../styles/pages/organisation/billing.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingPage = ({ className }) => (
    <MainLayout>
        <Page
            section={
                <FormattedMessage
                    defaultMessage="Organisation"
                    descrition="Organisation section title"
                />
            }
            title={<FormattedMessage defaultMessage="Billing" descrition="Billing page title" />}
            sidebar={<OrganisationMenu asList />}
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
