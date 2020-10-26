/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationUpdate } from '@micromag/data';

import * as AppPropTypes from '../../lib/PropTypes';

import { organisation as organisationFields } from './fields';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: organisationFields,
    className: null,
    onUpdated: null,
};

const OrganisationSettingsForm = ({ organisation, fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const { update: updateOrganisation } = useOrganisationUpdate(organisation.id);
    const postForm = useCallback((action, data) => updateOrganisation(data), [updateOrganisation]);
    return (
        <Form
            action={url('organisation.settings')}
            fields={fields}
            initialValue={organisation}
            postForm={postForm}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Save" description="Button label" />
            }
            onComplete={onUpdated}
            className={className}
        />
    );
};

OrganisationSettingsForm.propTypes = propTypes;
OrganisationSettingsForm.defaultProps = defaultProps;

export default OrganisationSettingsForm;
