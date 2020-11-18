import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form, Button } from '@micromag/core/components';
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
            type: 'fields',
            isSection: true,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: <FormattedMessage defaultMessage="Name" description="Field label" />,
                },
                {
                    name: 'image',
                    type: 'image',
                    label: <FormattedMessage defaultMessage="Image" description="Field label" />,
                },
            ],
        },
        {
            name: 'email',
            type: 'email',
            label: <FormattedMessage defaultMessage="Email" description="Field label" />,
        },
        {
            group: 'password',
            type: 'fields',
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

    const [changePassword, setChangePassword] = useState(false);
    const togglePassword = useCallback(() => {
        setChangePassword((p) => !p);
    }, [setChangePassword]);
    const currentFields = fields.filter(
        (f) => (!changePassword && f.group !== 'password') || changePassword,
    );

    return (
        <Form
            action={url('account')}
            fields={currentFields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={
                <FormattedMessage
                    defaultMessage="Update profile"
                    description="Update profile button label"
                />
            }
            onComplete={onUpdated !== null ? onUpdated : null}
            className={className}
        >
            {!changePassword ? (
                <Button className="mt-4" theme="primary" outline onClick={togglePassword}>
                    <FormattedMessage
                        defaultMessage="Change password"
                        description="Change password button label"
                    />
                </Button>
            ) : null}
        </Form>
    );
};

AccountProfileForm.propTypes = propTypes;
AccountProfileForm.defaultProps = defaultProps;

export default AccountProfileForm;
