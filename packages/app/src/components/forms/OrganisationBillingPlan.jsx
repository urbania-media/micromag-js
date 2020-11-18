/* eslint-disable jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading */
import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl, FormattedMessage } from 'react-intl';

import { Select } from '@micromag/fields';
import { Button } from '@micromag/core/components';
import { useOrganisationPlans } from '@micromag/data';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    className: null,
    onUpdated: null,
};

const BillingPlanForm = ({ organisation, className, onUpdated }) => {
    const intl = useIntl();
    const { plans } = useOrganisationPlans();
    const initialPlan = organisation.plan || 'starter';

    const [plan, setPlan] = useState(initialPlan);
    const [frequency, setFrequency] = useState('monthly');

    const getPlanLabel = useCallback(
        (p) => {
            let { label } = p;
            if (p.value === initialPlan) {
                label = `${p.label} - ${intl.formatMessage({
                    defaultMessage: 'Your current plan',
                    description: 'Your current plan label',
                })}`;
            }
            return p.prices[frequency] ? `${label} - ${p.prices[frequency].toFixed(2)}$` : label;
        },
        [initialPlan, frequency, intl],
    );

    const options = useMemo(
        () =>
            plans.map((p) => ({
                value: p.value,
                label: getPlanLabel(p),
            })),
        [plans, frequency, getPlanLabel],
    );

    const currentPlan = plans.find((p) => p.value === plan) || plans[0];
    const { label = '', features = {} } = currentPlan || {};
    const {
        users = null,
        storage = null,
        data = [],
        delivery = [],
        contact_us: contactUs = false,
    } = features || {};

    const updatePlan = () => {};

    const postForm = useCallback(() => {
        updatePlan({ plan });
        if (onUpdated !== null) {
            onUpdated();
        }
    }, [plan, updatePlan]);

    const onPlanChange = useCallback(
        (value) => {
            setPlan(value);
        },
        [setPlan, onUpdated],
    );

    const onMonthlyChange = useCallback(() => setFrequency('monthly'), [setFrequency]);
    const onYearlyChange = useCallback(() => setFrequency('yearly'), [setFrequency]);

    return (
        <div
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="btn-group mb-2">
                <Button
                    type="button"
                    className={classNames([
                        'btn',
                        'btn-primary',
                        {
                            'btn-secondary': frequency !== 'monthly',
                        },
                    ])}
                    onClick={onMonthlyChange}
                >
                    <FormattedMessage defaultMessage="Monthly" description="Button group label" />
                </Button>
                <Button
                    type="button"
                    className={classNames([
                        'btn',
                        'btn-primary',
                        {
                            'btn-secondary': frequency === 'monthly',
                        },
                    ])}
                    onClick={onYearlyChange}
                >
                    <FormattedMessage defaultMessage="Yearly" description="Button group label" />
                </Button>
            </div>

            <div className="form-group">
                <label htmlFor="plan-select" className="label">
                    <FormattedMessage
                        defaultMessage="Your plan"
                        description="Your plan field label"
                    />
                </label>
                <Select id="plan-select" value={plan} options={options} onChange={onPlanChange} />
            </div>
            <div className="mb-1">
                {contactUs ? (
                    <h6>
                        <FormattedMessage
                            defaultMessage="Contact us for pricing"
                            description="Plan label"
                        />
                    </h6>
                ) : (
                    <h6>
                        <FormattedMessage
                            defaultMessage="This plan includes:"
                            description="Plan label"
                        />
                    </h6>
                )}
                {users ? (
                    <p>
                        <FormattedMessage
                            defaultMessage="{users} users"
                            description="Plan label"
                            values={{ users }}
                        />
                    </p>
                ) : null}
                {storage ? (
                    <p>
                        <FormattedMessage
                            defaultMessage="{storage} GB"
                            description="Plan label"
                            values={{ storage }}
                        />
                    </p>
                ) : null}
                {data.map((item) =>
                    item === 'analytics' ? (
                        <p>
                            <FormattedMessage defaultMessage="Analytics" description="Plan label" />
                        </p>
                    ) : null,
                )}
                {delivery.map((item) =>
                    item === 'monetisation' ? (
                        <p>
                            <FormattedMessage
                                defaultMessage="Monetisation"
                                description="Plan label"
                            />
                        </p>
                    ) : null,
                )}
            </div>
            <div className="form-group">
                <Button
                    theme="primary"
                    size="md"
                    outline
                    onClick={postForm}
                    className={classNames({
                        active: true,
                    })}
                >
                    <FormattedMessage
                        defaultMessage="Choose the {name} plan"
                        description="Plan button label"
                        values={{ name: label }}
                    />
                </Button>
            </div>
        </div>
    );
};

BillingPlanForm.propTypes = propTypes;
BillingPlanForm.defaultProps = defaultProps;

export default BillingPlanForm;
