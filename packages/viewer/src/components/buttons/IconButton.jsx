/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

import styles from '../../styles/buttons/icon-button.module.css';

const propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
};

const IconButton = ({ iconClassName = null, className = null, ...props }) => (
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

export default IconButton;
