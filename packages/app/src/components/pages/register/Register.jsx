/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FormPanel, Label, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import RegisterForm from '../../forms/Register';

import styles from '../../../styles/pages/register/register.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.register.title',
        defaultMessage: 'Register',
    },
    description: {
        id: 'pages.register.description',
        defaultMessage: 'Please fill all the fields below.',
    },
    alreadyHaveAccount: {
        id: 'pages.register.already_have_account',
        defaultMessage: 'Already have an account?',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const RegisterPage = ({ className }) => {
    const url = useUrlGenerator();
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
                    <RegisterForm />

                    <div className={styles.links}>
                        <Link href={url('auth.login')}>{messages.alreadyHaveAccount}</Link>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

RegisterPage.propTypes = propTypes;
RegisterPage.defaultProps = defaultProps;

export default RegisterPage;
