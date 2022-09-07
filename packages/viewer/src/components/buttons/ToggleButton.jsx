/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../styles/buttons/toggle-button.module.scss';

const propTypes = {
    className: PropTypes.string,
    progressSpring: PropTypes.number,
    button: PropTypes.node,
    toggledButton: PropTypes.node,
    toggledButtonClassName: PropTypes.string,
};

const defaultProps = {
    className: null,
    progressSpring: 0,
    button: null,
    toggledButton: null,
    toggledButtonClassName: null,
};

const ToggleButton = ({ className, progressSpring, button, toggledButton, toggledButtonClassName }) => {
    if (button === null) return false;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <animated.div className={styles.normal} style={{
                transform: progressSpring.to((p) => `translateY(${p * -100}%)`)
            }}>
                {button}
            </animated.div>
            <animated.div
                className={classNames([
                    styles.toggled,
                    {
                        [toggledButtonClassName]: toggledButtonClassName !== null,
                    },
                ])}
                style={{
                    transform: progressSpring.to((p) => `translateY(${(p - 1) * -100}%)`)
                }}
            >
                {toggledButton}
            </animated.div>
        </div>
    );
};

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

export default ToggleButton;
