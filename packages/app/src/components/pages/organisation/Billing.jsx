/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationPlans } from '@micromag/data';

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

const OrganisationBillingPage = ({ className }) => {
    const url = useUrlGenerator();
    const { plans } = useOrganisationPlans();

    const {
        amount = '12.94',
        dueDate = '12 février 2020',
        cardEnding = '3535',
        plan = 'enterprise',
        frequency = 'monthly',
    } = {};

    const completePlan = plans.find((p) => p.value === plan) || plans[0];

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
                    <FormattedMessage defaultMessage="Billing" descrition="Billing page title" />
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
                    <div className="form-group mb-4">
                        <h6 className="text-uppercase text-secondary font-weight-bold">
                            <FormattedMessage
                                defaultMessage="Payments"
                                descrition="Payments billing section title"
                            />
                        </h6>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <FormattedMessage
                                        defaultMessage="Amount"
                                        descrition="Amount list item"
                                    />
                                </span>
                                <span>{amount}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <FormattedMessage
                                        defaultMessage="Due date"
                                        descrition="Due date list item"
                                    />
                                </span>
                                <span>{dueDate}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <Link href={url('organisation.billing_history')}>
                                    <FormattedMessage
                                        defaultMessage="Payment history"
                                        descrition="Payment history list item"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="form-group mb-4">
                        <h6 className="text-uppercase text-secondary font-weight-bold  mb-2">
                            <FormattedMessage
                                defaultMessage="Payment method"
                                descrition="Payment method billing section title"
                            />
                        </h6>
                        <ul class="list-group my-2">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <Link href={url('organisation.billing_info')}>
                                    <FormattedMessage
                                        defaultMessage="Card ending with {cardEnding}"
                                        descrition="Card ending with list item"
                                        values={{ cardEnding }}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="form-group mb-4">
                        <h6 className="text-uppercase text-secondary font-weight-bold mb-2">
                            <FormattedMessage
                                defaultMessage="Plan"
                                descrition="Plan billing section title"
                            />
                        </h6>
                        <ul class="list-group my-2">
                            <li class="list-group-item">
                                <Link href={url('organisation.billing_plan')}>
                                    <span className="d-block">{completePlan.label}</span>
                                    <span className="d-block font-weight-light">
                                        {frequency === 'monthly' ? (
                                            <FormattedMessage
                                                defaultMessage="Monthly"
                                                descrition="Monthly billing label"
                                            />
                                        ) : null}
                                        {frequency === 'yearly' ? (
                                            <FormattedMessage
                                                defaultMessage="Plan"
                                                descrition="Yearly billing label"
                                            />
                                        ) : null}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="form-group mb-4">
                        <h6 className="text-uppercase text-secondary font-weight-bold mb-2">
                            <FormattedMessage
                                defaultMessage="Users"
                                descrition="Users total section title"
                            />
                        </h6>
                        <p></p>
                    </div>
                    <div className="form-group mb-4">
                        <h6 className="text-uppercase text-secondary font-weight-bold mb-2">
                            <FormattedMessage
                                defaultMessage="Storage"
                                descrition="Storage total section title"
                            />
                        </h6>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationBillingPage.propTypes = propTypes;
OrganisationBillingPage.defaultProps = defaultProps;

export default OrganisationBillingPage;
