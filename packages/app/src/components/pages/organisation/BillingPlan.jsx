/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import OrganisationBillingPlanForm from '../../forms/OrganisationBillingPlan';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import styles from '../../../styles/pages/organisation/billing-plan.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingPlanPage = ({ className }) => {
    const organisation = useContextOrganisation();
    const url = useUrlGenerator();
    const push = useRoutePush();

    const onUpdated = useCallback(() => {
        push(url('organisation.billing'));
    }, [push, url]);

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage
                        defaultMessage="Organisation"
                        descrition="Organisation section title"
                    />
                }
                title={<FormattedMessage defaultMessage="Plan" descrition="Plan page title" />}
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
