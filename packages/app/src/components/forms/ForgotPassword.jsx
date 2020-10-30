/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useAuthForgot } from '@micromag/data';

import { useUser } from '../../contexts/AuthContext';

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onSuccess: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'email',
            type: 'email',
            label: <FormattedMessage defaultMessage="Email" description="Field label" />,
        },
    ],
    className: null,
    onSuccess: null,
};

const ForgotPasswordForm = ({ fields, className, onSuccess }) => {
    const [email, setEmail] = useState(null);
    const url = useUrlGenerator();
    const user = useUser();
    const { forgot: forgotPassword } = useAuthForgot();
    const postForm = useCallback(
        (action, { email: emailAddress }) => {
            setEmail(emailAddress);
            return forgotPassword(emailAddress);
        },
        [forgotPassword, setEmail],
    );
    const onComplete = useCallback(() => {
        onSuccess(email);
    }, [email, onSuccess]);

    return (
        <Form
            action={url('password.email')}
            fields={fields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={
                <FormattedMessage
                    defaultMessage="Send request"
                    description="Forgot password button label"
                />
            }
            onComplete={onComplete}
            className={className}
        />
    );
};

ForgotPasswordForm.propTypes = propTypes;
ForgotPasswordForm.defaultProps = defaultProps;

export default ForgotPasswordForm;
