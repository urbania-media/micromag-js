/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { useThemes } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AccountSidebar from '../../sidebars/Account';
import ThemesList from '../../lists/Themes';
import { useUser } from '../../../contexts/AuthContext';

import styles from '../../../styles/pages/organisation/themes.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.location,
};

const defaultProps = {
    className: null,
};

const AccountThemesPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Themes" descrition="Page title" />;
    const nav = [{ label: title, url: pathname }];

    const user = useUser();
    const { themes = [] } = useThemes(user.id);

    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
                sidebar={<AccountSidebar asList />}
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

AccountThemesPage.propTypes = propTypes;
AccountThemesPage.defaultProps = defaultProps;

export default AccountThemesPage;
