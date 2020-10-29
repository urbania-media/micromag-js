/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import ForgotPasswordForm from '../../forms/ForgotPassword';

import styles from '../../../styles/pages/auth/forgot-password.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ForgotPasswordPage = ({ className }) => {
    const url = useUrlGenerator();
    return (
        <MainLayout contentAlign="middle">
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Forgot password"
                        description="Forgot password page title"
                    />
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
                                defaultMessage="Please enter your email address to get a password reset link."
                                description="Forgot password page description"
                            />
                        </div>
                    }
                >
                    <ForgotPasswordForm />
                    <div className={styles.links}>
                        <Link href={url('auth.login')}>
                            <FormattedMessage
                                defaultMessage="Go back to login"
                                description="Back to login link"
                            />
                        </Link>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

ForgotPasswordPage.propTypes = propTypes;
ForgotPasswordPage.defaultProps = defaultProps;

export default ForgotPasswordPage;
