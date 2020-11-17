/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useOrganisation, useOrganisationContact } from '@micromag/data';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import OrganisationSettingsForm from '../../forms/OrganisationSettings';
import OrganisationContactForm from '../../forms/OrganisationContact';

import styles from '../../../styles/pages/organisation/settings.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsPage = ({ className }) => {
    const currentOrganisation = useContextOrganisation();
    const { organisation } = useOrganisation(currentOrganisation.id);
    const { contact } = useOrganisationContact(currentOrganisation.id, 'main');

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage
                        defaultMessage="Organisation"
                        descrition="Organisation section title"
                    />
                }
                title={
                    <FormattedMessage defaultMessage="Settings" descrition="Settings page title" />
                }
                sidebar={<OrganisationMenu asList />}
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
