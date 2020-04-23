/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../../styles/pages/account/account.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountPage = ({ className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        account
    </div>
);

AccountPage.propTypes = propTypes;
AccountPage.defaultProps = defaultProps;

export default AccountPage;
