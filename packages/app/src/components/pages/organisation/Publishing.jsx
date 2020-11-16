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

import styles from '../../../styles/pages/organisation/team.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationPublishingPage = ({ className }) => {
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
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>Manage types of publication and pages/api keys</FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationPublishingPage.propTypes = propTypes;
OrganisationPublishingPage.defaultProps = defaultProps;

export default OrganisationPublishingPage;
