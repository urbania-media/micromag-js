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

import { organisation as organisationFields, contact as contactFields } from './organisationFields';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    mainContact: AppPropTypes.contact,
    organisationFields: MicromagPropTypes.formFields,
    contactFields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    mainContact: null,
    organisationFields,
    contactFields,
    className: null,
    onUpdated: null,
};

const OrganisationSettingsForm = ({
    organisation,
    mainContact,
    organisationFields: organisationFieldsProp,
    contactFields: contactFieldsProp,
    className,
    onUpdated,
}) => {
    const url = useUrlGenerator();
    const { id } = organisation || {};
    const { update: updateOrganisation } = useOrganisationUpdate(id);
    const { create: createContact } = useOrganisationContactCreate(id);
    const { update: updateContact } = useOrganisationContactUpdate(id);

    const postOrganisation = useCallback(
        (action, data) => {
            return updateOrganisation(data);
        },
        [updateOrganisation],
    );

    const postContact = useCallback(
        (action, data) => {
            const contact = { ...mainContact, type: 'main' };
            if (contact && contact.id) {
                return updateContact(contact.id, { ...contact, ...data });
            }
            return createContact({ ...contact, ...data });
        },
        [createContact, updateContact, mainContact],
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
            <hr />
            <p>
                <FormattedMessage
                    defaultMessage="Main contact"
                    description="Main contact form label"
                />
            </p>
            <Form
                action={url('organisation.contact')}
                fields={contactFieldsProp}
                initialValue={mainContact}
                postForm={postContact}
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
