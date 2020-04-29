/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';

import styles from '../../../styles/pages/organisation/medias.module.scss';

import organisationMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.organisation.medias.title',
        defaultMessage: 'Medias',
    }
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationMediasPage = ({ className }) => (
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
            <MediaGallery />
        </Page>
    </MainLayout>
);

OrganisationMediasPage.propTypes = propTypes;
OrganisationMediasPage.defaultProps = defaultProps;

export default OrganisationMediasPage;
