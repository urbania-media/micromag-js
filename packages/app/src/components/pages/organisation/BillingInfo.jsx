/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import BillingInfoForm from '../../forms/BillingInfo';
import OrganisationMenu from '../../menus/Organisation';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/organisation/billing-info.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingInfoPage = ({ className }) => {
    const organisation = useContextOrganisation();
    // const { fields } = useOrganisationBillingMethod(organisation.id);

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
                        defaultMessage="Billing info"
                        descrition="Billing info page title"
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
                    <BillingInfoForm organisation={organisation} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationBillingInfoPage.propTypes = propTypes;
OrganisationBillingInfoPage.defaultProps = defaultProps;

export default OrganisationBillingInfoPage;
