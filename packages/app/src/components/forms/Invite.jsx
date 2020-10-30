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
    onContinue: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'email',
            type: 'email',
            label: <FormattedMessage defaultMessage="Email" description="Email field label" />,
        },
    ],
    className: null,
    onContinue: null,
};

const InviteForm = ({ fields, className, onContinue }) => {
    const url = useUrlGenerator();
    const { create: updateAccount } = useAccountCreate();
    const postForm = useCallback((action, data) => updateAccount(data), [updateAccount]);
    return (
        <Form
            action={url('invite.collaborators')}
            fields={fields}
            postForm={postForm}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Continue" description="Continue button label" />
            }
            onComplete={onContinue}
            className={className}
        />
    );
};

InviteForm.propTypes = propTypes;
InviteForm.defaultProps = defaultProps;

export default InviteForm;
