/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useAccountCreate } from '@micromag/data';

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onRegistered: PropTypes.func,
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
            name: 'password',
            type: 'password',
            label: <FormattedMessage defaultMessage="Password" description="Field label" />,
        },
        {
            name: 'password_confirmation',
            type: 'password',
            label: <FormattedMessage defaultMessage="Confirm password" description="Field label" />,
        },
    ],
    className: null,
    onRegistered: null,
};

const RegisterForm = ({ fields, className, onRegistered }) => {
    const url = useUrlGenerator();
    const { create: createAccount } = useAccountCreate();
    const postForm = useCallback((action, data) => createAccount(data), [createAccount]);
    return (
        <Form
            action={url('register')}
            fields={fields}
            postForm={postForm}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Create account" description="Button label" />
            }
            onComplete={onRegistered}
            className={className}
        />
    );
};

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
