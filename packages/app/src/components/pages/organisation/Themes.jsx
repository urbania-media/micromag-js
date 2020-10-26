/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';

import styles from '../../../styles/pages/organisation/themes.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationThemesPage = ({ className }) => (
    <MainLayout>
        <Page
            section={<FormattedMessage defaultMessage="Organisation" descrition="Section title" />}
            title={<FormattedMessage defaultMessage="Themes" descrition="Page title" />}
            sidebar={<OrganisationMenu asList />}
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
