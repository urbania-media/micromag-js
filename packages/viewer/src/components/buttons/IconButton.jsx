/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

import styles from '../../styles/buttons/icon-button.module.scss';

const propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    iconClassName: null,
    className: null,
};

const IconButton = ({ iconClassName, className, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        labelClassName={styles.label}
        iconClassName={classNames([
            styles.icon,
            {
                [iconClassName]: iconClassName !== null,
            },
        ])}
        {...props}
    />
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
