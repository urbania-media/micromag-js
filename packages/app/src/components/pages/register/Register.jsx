/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { parse as parseQueryString } from 'query-string';
import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';

import { useAuth } from '../../../contexts/AuthContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import RegisterForm from '../../forms/Register';

import styles from '../../../styles/pages/register/register.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const RegisterPage = ({ className }) => {
    const url = useUrlGenerator();
    const push = useRoutePush();
    const { setUser } = useAuth();
    const { search } = useLocation();
    const { next = null } = parseQueryString(search);
    const onRegistered = useCallback(
        (user) => {
            setUser(user);
            push(next !== null ? next : url('register.complete'));
        },
        [push, url, setUser],
    );
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage defaultMessage="Register" description="Register page title" />
                }
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
                            <FormattedMessage
                                defaultMessage="First, enter your email and pick a password."
                                description="Register page description"
                            />
                        </div>
                    }
                >
                    <RegisterForm onRegistered={onRegistered} />
                    <div className={styles.links}>
                        <Link href={url('auth.login')}>
                            <FormattedMessage
                                defaultMessage="Already have an account?"
                                description="Already have an account page link"
                            />
                        </Link>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

RegisterPage.propTypes = propTypes;
RegisterPage.defaultProps = defaultProps;

export default RegisterPage;
