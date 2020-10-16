/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useOrganisation } from '@micromag/data';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import OrganisationSettingsForm from '../../forms/OrganisationSettings';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsPage = ({ className }) => {
    const currentOrganisation = useContextOrganisation();
    const { organisation } = useOrganisation(currentOrganisation.id);
    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Organisation" descrition="Section title" />
                }
                title={<FormattedMessage defaultMessage="Settings" descrition="Page title" />}
                sidebar={<OrganisationMenu asList />}
                className={className}
            >
                <div className="container-small">
                    {organisation !== null ? (
                        <FormPanel>
                            <OrganisationSettingsForm organisation={organisation} />
                        </FormPanel>
                    ) : null}
                </div>
            </Page>
        </MainLayout>
    );
};

OrganisationSettingsPage.propTypes = propTypes;
OrganisationSettingsPage.defaultProps = defaultProps;

export default OrganisationSettingsPage;
