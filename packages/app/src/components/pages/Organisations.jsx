/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { useOrganisations } from '@micromag/data';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import OrganisationsList from '../lists/Organisations';
import ProjectsList from '../lists/Projects';

import styles from '../../styles/pages/home.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationsPage = ({ className }) => {
    const { organisations } = useOrganisations();
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Choose an organisation"
                        description="Choose an organisation page title"
                    />
                }
                sidebar={null}
                menubar={null}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <div className="w-50 m-auto">
                    {organisations !== null ? (
                        <OrganisationsList className="mb-4" items={organisations} />
                    ) : null}
                    <ProjectsList />
                </div>
            </Page>
        </MainLayout>
    );
};

OrganisationsPage.propTypes = propTypes;
OrganisationsPage.defaultProps = defaultProps;

export default OrganisationsPage;
