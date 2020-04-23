/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../../styles/pages/auth/reset-password.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ResetPasswordPage = ({ className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        reset password
    </div>
);

ResetPasswordPage.propTypes = propTypes;
ResetPasswordPage.defaultProps = defaultProps;

export default ResetPasswordPage;
