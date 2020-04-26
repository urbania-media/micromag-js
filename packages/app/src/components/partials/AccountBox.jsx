/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useUser } from '../../contexts/AuthContext';

import styles from '../../styles/partials/account-box.module.scss';

const messages = defineMessages({
    title: {
        id: 'account-box.title',
        defaultMessage: 'Account',
    },
    profile: {
        id: 'account-box.profile',
        defaultMessage: 'Profile',
    },
    settings: {
        id: 'account-box.settings',
        defaultMessage: 'Settings',
    },
});

const propTypes = {
    withoutHeader: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    withoutHeader: false,
    className: null,
};

const AccountBox = ({ withoutHeader, className }) => {
    const user = useUser();
    const url = useUrlGenerator();
    return (
        <Card
            header={!withoutHeader ? messages.title : null}
            title={user.name}
            links={[
                {
                    label: messages.profile,
                    href: url('account.profile'),
                },
                {
                    label: messages.settings,
                    href: url('account.settings'),
                },
            ]}
            linksInSameBody
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <p>{user.email}</p>
        </Card>
    );
};

AccountBox.propTypes = propTypes;
AccountBox.defaultProps = defaultProps;

export default AccountBox;
