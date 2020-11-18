/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';
import { useNavItems } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import OrganisationBillingPlanForm from '../../forms/OrganisationBillingPlan';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/organisation/billing-plan.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingPlanPage = ({ location: { pathname }, className }) => {
    const url = useUrlGenerator();
    const parent = <FormattedMessage defaultMessage="Billing" descrition="Page title" />;
    const parentUrl = url('organisation.billing');

    const title = <FormattedMessage defaultMessage="Choose your plan" descrition="Page title" />;
    const nav = useNavItems([
        { label: parent, url: parentUrl },
        { label: title, url: pathname },
    ]);

    const organisation = useContextOrganisation();
    const push = useRoutePush();

    const onUpdated = useCallback(() => {
        push(url('organisation.billing'));
    }, [push, url]);

    return (
        <MainLayout nav={nav}>
            <Page
                section={
                    <Link href={parentUrl} withoutStyle>
                        {parent}
                    </Link>
                }
                title={title}
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <OrganisationBillingPlanForm
                        organisation={organisation}
                        onUpdated={onUpdated}
                    />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationBillingPlanPage.propTypes = propTypes;
OrganisationBillingPlanPage.defaultProps = defaultProps;

export default OrganisationBillingPlanPage;
