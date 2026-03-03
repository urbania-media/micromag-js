/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import React from 'react';

import styles from '../../styles/buttons/toggle-button.module.css';

interface ToggleButtonProps {
    className?: string;
    progressSpring?: Record<string, unknown>;
    button?: React.ReactNode;
    toggledButton?: React.ReactNode;
    toggledButtonClassName?: string;
}

function ToggleButton({
    className = null,
    progressSpring = null,
    button = null,
    toggledButton = null,
    toggledButtonClassName = null,
}) {
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
}

export default ToggleButton;
