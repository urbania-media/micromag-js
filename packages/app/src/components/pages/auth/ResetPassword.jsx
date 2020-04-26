/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/auth/reset-password.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.auth.reset_password.title',
        defaultMessage: 'Reset password',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ResetPasswordPage = ({ className }) => (
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
            reset password
        </Page>
    </MainLayout>
);

ResetPasswordPage.propTypes = propTypes;
ResetPasswordPage.defaultProps = defaultProps;

export default ResetPasswordPage;
