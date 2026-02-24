/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../styles/buttons/toggle-button.module.css';

const propTypes = {
    className: PropTypes.string,
    progressSpring: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    button: PropTypes.node,
    toggledButton: PropTypes.node,
    toggledButtonClassName: PropTypes.string,
};

const ToggleButton = ({
    className = null,
    progressSpring = null,
    button = null,
    toggledButton = null,
    toggledButtonClassName = null,
}) => {
    if (button === null) return null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <animated.div
                className={styles.normal}
                style={{
                    transform: progressSpring.to((p) => `translateY(${p * -100}%)`),
                }}
            >
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
                    transform: progressSpring.to((p) => `translateY(${(p - 1) * -100}%)`),
                }}
            >
                {toggledButton}
            </animated.div>
        </div>
    );
};

ToggleButton.propTypes = propTypes;

export default ToggleButton;
