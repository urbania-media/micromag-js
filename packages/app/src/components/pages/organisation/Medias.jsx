/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import MediaGallery from '@micromag/media-gallery';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';

import styles from '../../../styles/pages/organisation/medias.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationMediasPage = ({ className }) => (
    <MainLayout>
        <Page
            section={<FormattedMessage defaultMessage="Organisation" descrition="Section title" />}
            title={<FormattedMessage defaultMessage="Medias" descrition="Page title" />}
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
