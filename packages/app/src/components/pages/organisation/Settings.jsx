/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel } from '@micromag/core/components';
import { useOrganisation, useOrganisationContact } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationSidebar from '../../sidebars/Organisation';
import OrganisationSettingsForm from '../../forms/OrganisationSettings';
import OrganisationContactForm from '../../forms/OrganisationContact';

import styles from '../../../styles/pages/organisation/settings.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Settings" descrition="Page title" />;
    const nav = [{ label: title, url: pathname }];

    const currentOrganisation = useContextOrganisation();
    const { organisation } = useOrganisation(currentOrganisation.id);
    const { contact } = useOrganisationContact(currentOrganisation.id, 'main');

    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
                sidebar={<OrganisationSidebar asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel className="mb-4">
                    {organisation !== null ? (
                        <OrganisationSettingsForm organisation={organisation} />
                    ) : null}
                </FormPanel>
                <FormPanel>
                    {organisation !== null && contact ? (
                        <OrganisationContactForm
                            organisation={organisation}
                            contact={contact}
                            type="main"
                        />
                    ) : (
                        <p>Contact</p>
                    )}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationSettingsPage.propTypes = propTypes;
OrganisationSettingsPage.defaultProps = defaultProps;

export default OrganisationSettingsPage;
