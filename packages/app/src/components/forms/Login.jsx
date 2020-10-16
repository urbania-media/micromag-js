/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';

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
            label: <FormattedMessage defaultMessage="Email" description="Field label" />,
            required: true,
        },
        {
            name: 'password',
            type: 'password',
            label: <FormattedMessage defaultMessage="Password" description="Field label" />,
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
            submitButtonLabel={
                <FormattedMessage defaultMessage="Log in" description="Button label" />
            }
            className={className}
        />
    );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
