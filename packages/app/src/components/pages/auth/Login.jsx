/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FormPanel, Label } from '@micromag/core/components';

import PageHeader from '../../partials/PageHeader';
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
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const LoginPage = ({ className }) => (
    <div
        className={classNames([
            'container-small',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <PageHeader title={messages.title} />

        <FormPanel
            description={
                <div className={styles.description}>
                    <Label>{messages.description}</Label>
                </div>
            }
        >
            <LoginForm />
        </FormPanel>
    </div>
);

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;
