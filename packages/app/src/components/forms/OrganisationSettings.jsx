/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import {
    useOrganisationUpdate,
    useOrganisationContactCreate,
    useOrganisationContactUpdate,
} from '@micromag/data';

import * as AppPropTypes from '../../lib/PropTypes';

import { filterObject } from '../../lib/utils';

import { organisation as organisationFields } from './organisationFields';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    mainContact: AppPropTypes.contact,
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    mainContact: null,
    fields: organisationFields,
    className: null,
    onUpdated: null,
};

const OrganisationSettingsForm = ({ organisation, mainContact, fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const { id } = organisation || {};
    const { update: updateOrganisation } = useOrganisationUpdate(id);
    const { create: createContact } = useOrganisationContactCreate(id);
    const { update: updateContact } = useOrganisationContactUpdate(id);
    const postForm = useCallback(
        (action, data) => {
            const orgData = filterObject(data, (key) => key.indexOf('contact_') === -1);
            updateOrganisation(orgData).then(() => {
                const contactData = Object.keys(
                    filterObject(data, (key) => key.indexOf('contact_') === 0),
                ).reduce((acc, key) => {
                    acc[key.replace('contact_', '')] = data[key];
                    return acc;
                }, {});
                if (mainContact && mainContact.id) {
                    return updateContact(mainContact.id, { ...mainContact, ...contactData });
                }
                return createContact({ type: 'main', ...contactData });
            });
        },
        [updateOrganisation, createContact, updateContact, mainContact],
    );
    const value = {
        ...organisation,
        ...(mainContact !== null
            ? Object.keys(mainContact).reduce((acc, key) => {
                  acc[`contact_${key}`] = mainContact[key];
                  return acc;
              }, {})
            : null),
    };

    console.log(mainContact);
    return (
        <Form
            action={url('organisation.settings')}
            fields={fields}
            initialValue={value}
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
