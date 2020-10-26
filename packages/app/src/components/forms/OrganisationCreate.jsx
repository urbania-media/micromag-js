/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationCreate } from '@micromag/data';

import * as AppPropTypes from '../../lib/PropTypes';

import { organisation as organisationFields } from './fields';

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
    const { create: createOrganisation } = useOrganisationCreate();
    const postForm = useCallback((action, data) => createOrganisation(data), [createOrganisation]);
    return (
        <Form
            action={url('organisation.create')}
            fields={fields}
            initialValue={organisation}
            postForm={postForm}
            submitButtonLabel={<FormattedMessage defaultMessage="Create" description="Button label" />}
            onComplete={onCreated}
            className={className}
        />
    );
};

OrganisationCreateForm.propTypes = propTypes;
OrganisationCreateForm.defaultProps = defaultProps;

export default OrganisationCreateForm;
