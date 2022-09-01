/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../styles/buttons/toggle-button.module.scss';

const propTypes = {
    className: PropTypes.string,
    toggled: PropTypes.number,
    button: PropTypes.node,
    toggledButton: PropTypes.node,
    toggledButtonClassName: PropTypes.string,
};

const defaultProps = {
    className: null,
    toggled: 0,
    button: null,
    toggledButton: null,
    toggledButtonClassName: null,
};

const ToggleButton = ({ className, toggled, button, toggledButton, toggledButtonClassName }) => {
    if (button === null) return false;

    const getToggleButtonStyles = (t) => ({
        transform: `translateY(${t * -100}%)`,
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.normal} style={getToggleButtonStyles(toggled)}>
                {button}
            </div>
            <div
                className={classNames([
                    styles.toggled,
                    {
                        [toggledButtonClassName]: toggledButtonClassName !== null,
                    },
                ])}
                style={getToggleButtonStyles(toggled - 1)}
            >
                {toggledButton}
            </div>
        </div>
    );
};

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

export default ToggleButton;
