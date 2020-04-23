/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';

import { useUrlGenerator } from '../../contexts/RoutesContext';

import styles from '../../styles/forms/login.module.scss';

const messages = defineMessages({
    emailLabel: {
        id: 'forms.login.email_label',
        defaultMessage: 'Email',
    },
    passwordLabel: {
        id: 'forms.login.password_label',
        defaultMessage: 'Password',
    },
    submit: {
        id: 'forms.login.submit',
        defaultMessage: 'Log in',
    },
});

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
};

const defaultProps = {
    fields: [
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
    ],
    className: null,
};

const LoginForm = ({ fields, className }) => {
    const url = useUrlGenerator();
    return (
        <Form
            action={url('auth.login')}
            fields={fields}
            submitButtonLabel={messages.submit}
            className={classNames([
                styles.login,
                {
                    [className]: className !== null,
                },
            ])}
        />
    );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
