/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';

// import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationPublishingSettingsPage = ({ className }) => {
    // const organisation = useContextOrganisation();
    // const onChanged = useCallback(() => {
    //     load();
    // }, []);

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage
                        defaultMessage="Organisation"
                        description="Organisation section title"
                    />
                }
                title={
                    <FormattedMessage
                        defaultMessage="Publishing"
                        description="Publishing page title"
                    />
                }
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>Manage type</FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationPublishingSettingsPage.propTypes = propTypes;
OrganisationPublishingSettingsPage.defaultProps = defaultProps;

export default OrganisationPublishingSettingsPage;
