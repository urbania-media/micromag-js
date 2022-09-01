/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

import styles from '../../styles/buttons/icon-button.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const IconButton = ({ className, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        labelClassName={styles.label}
        iconClassName={styles.icon}
        {...props}
    />
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
