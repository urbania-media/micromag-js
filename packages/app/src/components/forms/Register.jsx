/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useApi } from '../../contexts/ApiContext';

import formMessages from './messages';

const messages = defineMessages({
    submit: {
        id: 'forms.register.submit',
        defaultMessage: 'Create account',
    },
});

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
            label: formMessages.nameLabel,
        },
        {
            name: 'email',
            type: 'email',
            label: formMessages.emailLabel,
        },
        {
            name: 'password',
            type: 'password',
            label: formMessages.passwordLabel,
        },
        {
            name: 'password_confirmation',
            type: 'password',
            label: formMessages.passwordConfirmationLabel,
        },
    ],
    className: null,
    onRegistered: null,
};

const RegisterForm = ({ fields, className, onRegistered }) => {
    const url = useUrlGenerator();
    const api = useApi();
    const postForm = useCallback((action, data) => api.auth.register(data), [api]);
    return (
        <Form
            action={url('register')}
            fields={fields}
            postForm={postForm}
            submitButtonLabel={messages.submit}
            onComplete={onRegistered}
            className={className}
        />
    );
};

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
