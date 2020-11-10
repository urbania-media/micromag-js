/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel } from '@micromag/core/components';
import { useOrganisationBillingHistory } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import PaymentsList from '../../lists/Payments';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/organisation/billing-history.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingHistoryPage = ({ className }) => {
    const organisation = useContextOrganisation();
    const { items } = useOrganisationBillingHistory(organisation.id);

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage
                        defaultMessage="Organisation"
                        descrition="Organisation section title"
                    />
                }
                title={
                    <FormattedMessage
                        defaultMessage="Payment history"
                        descrition="Payment history page title"
                    />
                }
                sidebar={<OrganisationMenu asList />}
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
