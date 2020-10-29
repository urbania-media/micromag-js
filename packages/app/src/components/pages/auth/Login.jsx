/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router';
import { parse as parseQueryString } from 'query-string';
import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import LoginForm from '../../forms/Login';

import styles from '../../../styles/pages/auth/login.module.scss';

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
        <MainLayout contentAlign="middle">
            <Page
                title={<FormattedMessage defaultMessage="Login" description="Login page title" />}
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <LoginForm onLoggedIn={onLoginComplete} />
                    <div className={styles.links}>
                        <Link href={url('auth.forgot_password')}>
                            <FormattedMessage
                                defaultMessage="Forgot password?"
                                description="Forgot password page link"
                            />
                        </Link>
                        <Link href={url('register')}>
                            <FormattedMessage
                                defaultMessage="Register"
                                description="Register page link"
                            />
                        </Link>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;
