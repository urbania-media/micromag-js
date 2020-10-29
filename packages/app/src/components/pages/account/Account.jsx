/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AccountMenu from '../../menus/Account';

import styles from '../../../styles/pages/account/account.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountPage = ({ className }) => (
    <MainLayout>
        <Page
            title={<FormattedMessage defaultMessage="Account" description="Account page title" />}
            sidebar={<AccountMenu asList />}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Main account page
        </Page>
    </MainLayout>
);

AccountPage.propTypes = propTypes;
AccountPage.defaultProps = defaultProps;

export default AccountPage;
