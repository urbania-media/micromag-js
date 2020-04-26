/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/organisation/themes.module.scss';

import organisationMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.organisation.themes.title',
        defaultMessage: 'Themes',
    }
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationThemesPage = ({ className }) => (
    <MainLayout>
        <Page
            section={organisationMessages.title}
            title={messages.title}
            sidebar="sidebar"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Themes
        </Page>
    </MainLayout>
);

OrganisationThemesPage.propTypes = propTypes;
OrganisationThemesPage.defaultProps = defaultProps;

export default OrganisationThemesPage;
