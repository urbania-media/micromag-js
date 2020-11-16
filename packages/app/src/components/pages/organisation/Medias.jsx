/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import MediaGallery from '@micromag/media-gallery';
import { FormPanel } from '@micromag/core/components';

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
            section={
                <FormattedMessage
                    defaultMessage="Organisation"
                    descrition="Organisation section title"
                />
            }
            title={<FormattedMessage defaultMessage="Medias" descrition="Medias page title" />}
            sidebar={<OrganisationMenu asList />}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <FormPanel>
                <MediaGallery source="all" withoutSource withoutTitle />
            </FormPanel>
        </Page>
    </MainLayout>
);

OrganisationMediasPage.propTypes = propTypes;
OrganisationMediasPage.defaultProps = defaultProps;

export default OrganisationMediasPage;
