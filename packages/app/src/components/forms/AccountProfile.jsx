/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useAccountUpdate } from '@micromag/data';

import { useUser } from '../../contexts/AuthContext';

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'name',
            type: 'text',
            label: <FormattedMessage defaultMessage="Name" description="Field label" />,
        },
        {
            name: 'email',
            type: 'email',
            label: <FormattedMessage defaultMessage="Email" description="Field label" />,
        },
        {
            type: 'fields',
            label: (
                <FormattedMessage defaultMessage="Change password" description="Fieldset label" />
            ),
            isSection: true,
            fields: [
                {
                    name: 'password',
                    type: 'password',
                    label: <FormattedMessage defaultMessage="Password" description="Field label" />,
                },
                {
                    name: 'password_confirmation',
                    type: 'password',
                    label: (
                        <FormattedMessage
                            defaultMessage="Confirm password"
                            description="Field label"
                        />
                    ),
                },
            ],
        },
    ],
    className: null,
    onUpdated: null,
};

const AccountProfileForm = ({ fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const user = useUser();
    const { update: updateAccount } = useAccountUpdate();
    const postForm = useCallback((action, data) => updateAccount(data), [updateAccount]);
    return (
        <Form
            action={url('account')}
            fields={fields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Update profile" description="Button label" />
            }
            onComplete={onUpdated !== null ? onUpdated : null}
            className={className}
        />
    );
};

AccountProfileForm.propTypes = propTypes;
AccountProfileForm.defaultProps = defaultProps;

export default AccountProfileForm;
