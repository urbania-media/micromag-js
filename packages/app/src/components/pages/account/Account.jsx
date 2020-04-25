/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import PageHeader from '../../partials/PageHeader';

import styles from '../../../styles/pages/account/account.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.account.title',
        defaultMessage: 'Your account',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountPage = ({ className }) => (
    <div
        className={classNames([
            'container',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <PageHeader title={messages.title} />

        <div className="row">
            <aside className="col-md-4 order-md-last">
                Sidebar
            </aside>
            <div className="col-md-8">
                Main
            </div>
        </div>
    </div>
);

AccountPage.propTypes = propTypes;
AccountPage.defaultProps = defaultProps;

export default AccountPage;
