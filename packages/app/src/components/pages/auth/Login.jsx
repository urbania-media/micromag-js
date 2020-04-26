/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { useHistory, useLocation } from 'react-router';
import { parse as parseQueryString } from 'query-string';
import { FormPanel, Label, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import LoginForm from '../../forms/Login';

import styles from '../../../styles/pages/auth/login.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.login.title',
        defaultMessage: 'Login',
    },
    description: {
        id: 'pages.login.description',
        defaultMessage: 'Please login with your credentials',
    },
    forgotPassword: {
        id: 'pages.login.forgot_password',
        defaultMessage: 'Forgot password?',
    },
    register: {
        id: 'pages.login.register',
        defaultMessage: 'Register',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const LoginPage = ({ className }) => {
    const url = useUrlGenerator();
    const history = useHistory();
    const { search } = useLocation();
    const { next = null } = parseQueryString(search);
    const onLoginComplete = useCallback(() => {
        history.push(next !== null ? next : url('home'));
    }, [history, url]);
    return (
        <MainLayout>
            <Page
                title={messages.title}
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel
                    description={
                        <div className={styles.description}>
                            <Label>{messages.description}</Label>
                        </div>
                    }
                >
                    <LoginForm onLoggedIn={onLoginComplete} />

                    <div className={styles.links}>
                        <Link href={url('auth.forgot_password')}>{messages.forgotPassword}</Link>
                        <Link href={url('register')}>{messages.register}</Link>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;
