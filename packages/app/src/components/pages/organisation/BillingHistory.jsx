/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationBillingHistory } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationSidebar from '../../sidebars/Organisation';
import PaymentsList from '../../lists/Payments';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/organisation/billing-history.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingHistoryPage = ({ location: { pathname }, className }) => {
    const url = useUrlGenerator();
    const parent = <FormattedMessage defaultMessage="Billing" descrition="Page title" />;
    const parentUrl = url('organisation.billing');

    const title = <FormattedMessage defaultMessage="Payment history" descrition="Page title" />;
    const nav = [
        { label: parent, url: parentUrl },
        { label: title, url: pathname },
    ];

    const organisation = useContextOrganisation();
    const { items } = useOrganisationBillingHistory(organisation.id);

    return (
        <MainLayout nav={nav}>
            <Page
                section={
                    <Link href={parentUrl} withoutStyle>
                        {parent}
                    </Link>
                }
                title={title}
                sidebar={<OrganisationSidebar asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <PaymentsList items={items} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationBillingHistoryPage.propTypes = propTypes;
OrganisationBillingHistoryPage.defaultProps = defaultProps;

export default OrganisationBillingHistoryPage;
