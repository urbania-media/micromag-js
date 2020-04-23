/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../../styles/pages/auth/forgot-password.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ForgotPasswordPage = ({ className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        forgot password
    </div>
);

ForgotPasswordPage.propTypes = propTypes;
ForgotPasswordPage.defaultProps = defaultProps;

export default ForgotPasswordPage;
