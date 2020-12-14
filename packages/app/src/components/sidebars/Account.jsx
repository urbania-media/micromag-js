/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';

import { useUser } from '../../contexts/AuthContext';
import AccountMenu from '../menus/Account';

import styles from '../../styles/partials/account-box.module.scss';

const propTypes = {
    withoutHeader: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    withoutHeader: true,
    className: null,
};

const AccountSidebar = ({ withoutHeader, className }) => {
    const user = useUser();
    return (
        <Card
            header={
                !withoutHeader ? (
                    <FormattedMessage defaultMessage="Account" description="Card title" />
                ) : null
            }
            title={user.name ? user.name : null}
            afterBody={<AccountMenu asList flush />}
            theme="dark"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            bodyClassName={styles.body}
        >
            <p className="mb-0">{user.email}</p>
        </Card>
    );
};

AccountSidebar.propTypes = propTypes;
AccountSidebar.defaultProps = defaultProps;

export default AccountSidebar;
