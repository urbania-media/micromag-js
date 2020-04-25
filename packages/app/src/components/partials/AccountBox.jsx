/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';

import { useUser } from '../../contexts/AuthContext';

import styles from '../../styles/partials/account-box.module.scss';

const messages = defineMessages({
    title: {
        id: 'account-box.title',
        defaultMessage: 'Account',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountBox = ({ className }) => {
    const user = useUser();
    return (
        <Card
            header={messages.title}
            title={user.name}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        />
    );
};

AccountBox.propTypes = propTypes;
AccountBox.defaultProps = defaultProps;

export default AccountBox;
