/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AccountMenu from '../../menus/Account';
import ProfileForm from '../../forms/AccountProfile';
import DeleteForm from '../../forms/AccountDelete';

import styles from '../../../styles/pages/account/account.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountProfilePage = ({ className }) => (
    <MainLayout>
        <Page
            section={
                <FormattedMessage defaultMessage="Account" description="Account page section" />
            }
            title={
                <FormattedMessage
                    defaultMessage="Update your profile"
                    description="Update your profile page title"
                />
            }
            sidebar={<AccountMenu asList />}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <FormPanel>
                <ProfileForm />
            </FormPanel>
            <div className={styles.separator} />
            <FormPanel
                description={
                    <div className={styles.description}>
                        <FormattedMessage
                            defaultMessage="Are you sure you want to delete your profile? This action cannot be reversed."
                            description="Update your profile page title"
                        />
                    </div>
                }
            >
                <DeleteForm />
            </FormPanel>
        </Page>
    </MainLayout>
);

AccountProfilePage.propTypes = propTypes;
AccountProfilePage.defaultProps = defaultProps;

export default AccountProfilePage;
