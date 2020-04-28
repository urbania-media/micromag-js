/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FormPanel } from '@micromag/core/components';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import { useOrganisation } from '../../../hooks/useData';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import OrganisationSettingsForm from '../../forms/OrganisationSettings';

import styles from '../../../styles/pages/organisation/settings.module.scss';

import organisationMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.organisation.settings.title',
        defaultMessage: 'Billing',
    },
});

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
                section={organisationMessages.title}
                title={messages.title}
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
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
