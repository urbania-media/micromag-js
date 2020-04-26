/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AccountMenu from '../../menus/Account';
import ProfileForm from '../../forms/AccountProfile';

import styles from '../../../styles/pages/account/account.module.scss';

import accountMessages from './messages';

const messages = defineMessages({
    title: {
        id: 'pages.account.profile.title',
        defaultMessage: 'Update your profile',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountProfilePage = ({ className }) => (
    <MainLayout>
        <Page
            section={accountMessages.title}
            title={messages.title}
            sidebar={
                <AccountMenu
                    withoutDropdown
                    className="list-group"
                    itemClassName="list-group-item"
                />
            }
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <ProfileForm />
        </Page>
    </MainLayout>
);

AccountProfilePage.propTypes = propTypes;
AccountProfilePage.defaultProps = defaultProps;

export default AccountProfilePage;
