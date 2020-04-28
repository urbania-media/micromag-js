/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import * as AppPropTypes from '../../lib/PropTypes';
import { useApi } from '../../contexts/ApiContext';

import formMessages from './messages';
import { organisation as organisationFields } from './fields';

// const messages = defineMessages({
//     mainContact: {
//         id: 'forms.organisation.create.main_contact',
//         defaultMessage: 'Main contact',
//     },
// });

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onCreated: PropTypes.func,
};

const defaultProps = {
    fields: organisationFields,
    className: null,
    onCreated: null,
};

const OrganisationCreateForm = ({ organisation, fields, className, onCreated }) => {
    const url = useUrlGenerator();
    const api = useApi();
    const postForm = useCallback((action, data) => api.organisations.create(data), [api]);
    return (
        <Form
            action={url('organisation.create')}
            fields={fields}
            initialValue={organisation}
            postForm={postForm}
            submitButtonLabel={formMessages.createButton}
            onComplete={onCreated}
            className={className}
        />
    );
};

OrganisationCreateForm.propTypes = propTypes;
OrganisationCreateForm.defaultProps = defaultProps;

export default OrganisationCreateForm;
