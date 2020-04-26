/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AccountMenu from '../../menus/Account';

import styles from '../../../styles/pages/account/account.module.scss';

import accountMessages from './messages';

const messages = defineMessages({});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountPage = ({ className }) => (
    <MainLayout>
        <Page
            title={accountMessages.title}
            sidebar={<AccountMenu asList />}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Main
        </Page>
    </MainLayout>
);

AccountPage.propTypes = propTypes;
AccountPage.defaultProps = defaultProps;

export default AccountPage;
