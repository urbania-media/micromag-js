/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationBillingPlan } from '@micromag/data';

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'plan',
            type: 'select',
            label: <FormattedMessage defaultMessage="Plan" description="Plan field label" />,
        },
    ],
    className: null,
    onUpdated: null,
};

const BillingPlanForm = ({ fields, className, onUpdated }) => {
    const url = useUrlGenerator();

    const { update: updatePlan } = useOrganisationBillingPlan();
    const postForm = useCallback((action, data) => updatePlan(data), [updatePlan]);

    return (
        <Form
            action={url('account')}
            fields={fields}
            postForm={postForm}
            initialValue={{}}
            submitButtonLabel={
                <FormattedMessage
                    defaultMessage="Save payment method"
                    description="Save payment method Button label"
                />
            }
            onComplete={onUpdated !== null ? onUpdated : null}
            className={className}
        />
    );
};

BillingPlanForm.propTypes = propTypes;
BillingPlanForm.defaultProps = defaultProps;

export default BillingPlanForm;
