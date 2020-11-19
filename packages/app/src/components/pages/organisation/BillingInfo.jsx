/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationBillingInfoForm from '../../forms/OrganisationBillingInfo';
import OrganisationSidebar from '../../sidebars/Organisation';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/organisation/billing-info.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingInfoPage = ({ location: { pathname }, className }) => {
    const url = useUrlGenerator();
    const parent = <FormattedMessage defaultMessage="Billing" descrition="Page title" />;
    const parentUrl = url('organisation.billing');

    const title = <FormattedMessage defaultMessage="Payment information" descrition="Page title" />;
    const nav = [
        { label: parent, url: parentUrl },
        { label: title, url: pathname },
    ];

    const organisation = useContextOrganisation();

    // const { fields } = useOrganisationBillingMethod(organisation.id);

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
                    <OrganisationBillingInfoForm organisation={organisation} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationBillingInfoPage.propTypes = propTypes;
OrganisationBillingInfoPage.defaultProps = defaultProps;

export default OrganisationBillingInfoPage;
