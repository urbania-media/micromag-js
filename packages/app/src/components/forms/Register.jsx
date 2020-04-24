/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useApi } from '../../contexts/ApiContext';

import styles from '../../styles/forms/register.module.scss';

const messages = defineMessages({
    nameLabel: {
        id: 'forms.register.name_label',
        defaultMessage: 'Name',
    },
    emailLabel: {
        id: 'forms.register.email_label',
        defaultMessage: 'Email',
    },
    passwordLabel: {
        id: 'forms.register.password_label',
        defaultMessage: 'Password',
    },
    passwordConfirmationLabel: {
        id: 'forms.register.password_confirmation_label',
        defaultMessage: 'Confirm password',
    },
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
            label: messages.nameLabel,
        },
        {
            name: 'email',
            type: 'email',
            label: messages.emailLabel,
        },
        {
            name: 'password',
            type: 'password',
            label: messages.passwordLabel,
        },
        {
            name: 'password_confirmation',
            type: 'password',
            label: messages.passwordConfirmationLabel,
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
            className={classNames([
                styles.login,
                {
                    [className]: className !== null,
                },
            ])}
        />
    );
};

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
