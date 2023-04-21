/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../styles/partials/spinner.module.scss';

const propTypes = {
    animated: PropTypes.bool,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    animated: true,
    color: 'currentColor',
    strokeWidth: 3,
    className: null,
};

const Spinner = ({ animated, color, strokeWidth, className }) => (
    <svg
        className={classNames([
            styles.container,
            {
                [styles.animated]: animated,
                [className]: className !== null,
            },
        ])}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            className={styles.path}
            cx="20"
            cy="20"
            r="12"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
        />
    </svg>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
