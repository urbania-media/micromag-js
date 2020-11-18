/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisationContactCreate, useOrganisationContactUpdate } from '@micromag/data';

import * as AppPropTypes from '../../lib/PropTypes';

import { contact as contactFields } from './fields';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    contact: AppPropTypes.contact,
    contactType: PropTypes.string,
    contactFields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    contact: null,
    contactFields,
    contactType: 'main',
    className: null,
    onUpdated: null,
};

const OrganisationContactForm = ({
    organisation,
    contact,
    contactType,
    contactFields: contactFieldsProp,
    className,
    onUpdated,
}) => {
    const url = useUrlGenerator();
    const { id } = organisation || {};
    const { create: createContact } = useOrganisationContactCreate(id);
    const { update: updateContact } = useOrganisationContactUpdate(id);

    const postContact = useCallback(
        (action, data) => {
            const contactData = { ...contact, ...data, type: contactType };
            if (contactData && contactData.id) {
                return updateContact(contact.id, contactData);
            }
            return createContact(contactData);
        },
        [createContact, updateContact, contact, contactType],
    );

    return (
        <div>
            <p>
                <span className="text-uppercase text-secondary">
                    <FormattedMessage defaultMessage="Main contact" description="Form label" />
                </span>
            </p>
            <Form
                action={url('organisation.contact')}
                fields={contactFieldsProp}
                initialValue={contact}
                postForm={postContact}
                submitButtonLabel={
                    <FormattedMessage defaultMessage="Save contact" description="Button label" />
                }
                onComplete={onUpdated}
                className={className}
            />
        </div>
    );
};

OrganisationContactForm.propTypes = propTypes;
OrganisationContactForm.defaultProps = defaultProps;

export default OrganisationContactForm;
