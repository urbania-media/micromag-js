/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
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
    onUpdated: PropTypes.func,
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
    onUpdated: null,
};

const ForgotPasswordForm = ({ fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const user = useUser();
    const { forgot: forgotPassword } = useAuthForgot();
    const postForm = useCallback((action, { email }) => forgotPassword(email), [forgotPassword]);
    return (
        <Form
            action={url('account.profile')}
            fields={fields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={
                <FormattedMessage
                    defaultMessage="Send request"
                    description="Forgot password button label"
                />
            }
            onComplete={onUpdated}
            className={className}
        />
    );
};

ForgotPasswordForm.propTypes = propTypes;
ForgotPasswordForm.defaultProps = defaultProps;

export default ForgotPasswordForm;
