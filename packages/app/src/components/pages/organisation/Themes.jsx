/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { useOrganisationThemes } from '@micromag/data';
import { useNav } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import ThemesList from '../../lists/Themes';

import styles from '../../../styles/pages/organisation/themes.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.location,
};

const defaultProps = {
    className: null,
};

const OrganisationThemesPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Themes" descrition="Page title" />;
    const nav = useNav(title, pathname);

    const organisation = useContextOrganisation();
    const { themes } = useOrganisationThemes(organisation.id);

    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <ThemesList items={themes} />
            </Page>
        </MainLayout>
    );
};

OrganisationThemesPage.propTypes = propTypes;
OrganisationThemesPage.defaultProps = defaultProps;

export default OrganisationThemesPage;
