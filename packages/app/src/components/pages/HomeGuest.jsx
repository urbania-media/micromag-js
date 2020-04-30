/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';

import styles from '../../styles/pages/home-guest.module.scss';
import logo from '../../assets/logo-square-beta.svg';

const messages = defineMessages({
    createAccount: {
        id: 'pages.home.create_account',
        defaultMessage: 'Create an account',
    },
    login: {
        id: 'pages.home.login',
        defaultMessage: 'Login',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HomeGuestPage = ({ className }) => {
    const url = useUrlGenerator();
    return (
        <MainLayout contentAlign="middle">
            <Page
                className={classNames([
                    'container',
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <div className="pb-4">
                    <img src={logo} alt="micromag" className={styles.logo} />
                </div>
                <div className="mt-4">
                    <Button href={url('register')} theme="primary" size="lg" className="mr-4">
                        {messages.createAccount}
                    </Button>
                    <Button href={url('auth.login')} theme="secondary">
                        {messages.login}
                    </Button>
                </div>
            </Page>
        </MainLayout>
    );
};

HomeGuestPage.propTypes = propTypes;
HomeGuestPage.defaultProps = defaultProps;

export default HomeGuestPage;
