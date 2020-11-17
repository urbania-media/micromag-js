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
    organisationFields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    organisationFields,
    className: null,
    onUpdated: null,
};

const OrganisationSettingsForm = ({
    organisation,
    organisationFields: organisationFieldsProp,
    className,
    onUpdated,
}) => {
    const url = useUrlGenerator();
    const { id } = organisation || {};
    const { update: updateOrganisation } = useOrganisationUpdate(id);

    const postOrganisation = useCallback(
        (action, data) => {
            return updateOrganisation(data);
        },
        [updateOrganisation],
    );

    return (
        <div>
            <Form
                action={url('organisation.settings')}
                fields={organisationFieldsProp}
                initialValue={organisation}
                postForm={postOrganisation}
                submitButtonLabel={
                    <FormattedMessage defaultMessage="Save" description="Button label" />
                }
                onComplete={onUpdated}
                className={className}
            />
        </div>
    );
};

OrganisationSettingsForm.propTypes = propTypes;
OrganisationSettingsForm.defaultProps = defaultProps;

export default OrganisationSettingsForm;
