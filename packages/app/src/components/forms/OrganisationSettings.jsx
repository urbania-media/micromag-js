/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import * as AppPropTypes from '../../lib/PropTypes';
import { useApi } from '../../contexts/ApiContext';

import formMessages from './messages';

const messages = defineMessages({
    mainContact: {
        id: 'forms.organisation.settings.main_contact',
        defaultMessage: 'Main contact',
    },
});

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'name',
            type: 'text',
            label: formMessages.nameLabel,
        },
        {
            type: 'fields',
            label: messages.mainContact,
            fields: [
                {
                    name: 'contact_name',
                    type: 'text',
                    label: formMessages.nameLabel,
                },
                {
                    name: 'contact_email',
                    type: 'email',
                    label: formMessages.emailLabel,
                },
                {
                    name: 'contact_phone',
                    type: 'text',
                    label: formMessages.phoneLabel,
                },
            ],
        },
    ],
    className: null,
    onUpdated: null,
};

const OrganisationSettingsForm = ({ organisation, fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const api = useApi();
    const postForm = useCallback((action, data) => api.organisation.update(organisation.id, data), [
        organisation.api,
    ]);
    return (
        <Form
            action={url('organisation.settings')}
            fields={fields}
            initialValue={organisation}
            postForm={postForm}
            submitButtonLabel={formMessages.saveButton}
            onComplete={onUpdated}
            className={className}
        />
    );
};

OrganisationSettingsForm.propTypes = propTypes;
OrganisationSettingsForm.defaultProps = defaultProps;

export default OrganisationSettingsForm;
