/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/auth/forgot-password.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.auth.forgot_password.title',
        defaultMessage: 'Forgot password',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ForgotPasswordPage = ({ className }) => (
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
            forgot password
        </Page>
    </MainLayout>
);

ForgotPasswordPage.propTypes = propTypes;
ForgotPasswordPage.defaultProps = defaultProps;

export default ForgotPasswordPage;
