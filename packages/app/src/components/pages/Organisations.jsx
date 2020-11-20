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
    const list = (
        <>
            {organisations !== null ? (
                <OrganisationsList className="mb-4" items={organisations} />
            ) : null}
            <ProjectsList />
        </>
    );
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
                <div>
                    <div className="d-block d-md-none m-auto">{list}</div>
                    <div className="d-none d-md-block w-50 m-auto">{list}</div>
                </div>
            </Page>
        </MainLayout>
    );
};

OrganisationsPage.propTypes = propTypes;
OrganisationsPage.defaultProps = defaultProps;

export default OrganisationsPage;
