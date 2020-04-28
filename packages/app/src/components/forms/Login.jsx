/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';

import formMessages from './messages';

const messages = defineMessages({
    submit: {
        id: 'forms.login.submit',
        defaultMessage: 'Log in',
    },
});

const propTypes = {
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onLoggedIn: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'email',
            type: 'email',
            label: formMessages.emailLabel,
            required: true,
        },
        {
            name: 'password',
            type: 'password',
            label: formMessages.passwordLabel,
            required: true,
        },
    ],
    className: null,
    onLoggedIn: null,
};

const LoginForm = ({ fields, className, onLoggedIn }) => {
    const url = useUrlGenerator();
    const { login } = useAuth();
    const postForm = useCallback((action, { email, password }) => login(email, password), [login]);
    return (
        <Form
            action={url('auth.login')}
            postForm={postForm}
            fields={fields}
            onComplete={onLoggedIn}
            submitButtonLabel={messages.submit}
            className={className}
        />
    );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
