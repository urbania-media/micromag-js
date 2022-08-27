/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useProgressTransition } from '@micromag/core/hooks';

import styles from '../../styles/buttons/sliding-buttons.module.scss';

const propTypes = {
    className: PropTypes.string,
    current: PropTypes.number,
    buttons: PropTypes.arrayOf(PropTypes.node),
    buttonsProps: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)), // eslint-disable-line
    immediate: PropTypes.bool,
};

const defaultProps = {
    className: null,
    current: 0,
    buttons: null,
    buttonsProps: null,
    immediate: false,
};

const SlidingButtons = ({ className, current, buttons, buttonsProps, immediate }) => {
    if (buttons === null) return false;

    const { styles: slidingStyles = {} } = useProgressTransition({
        value: current,
        fn: (p) =>
            buttons.map((_, i) => {
                const t = i - p;
                return {
                    transform: `translateY(${t * -100}%)`,
                };
            }),
        params: {
            immediate,
            config: { tension: 300, friction: 30 },
        },
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
            {buttons.map((b, i) => {
                const SlidingButton = b;
                const buttonProps = buttonsProps[i] || {};
                const extraProps = buttonsProps !== null ? buttonProps : null;
                const { className: extraClassNames = null } = extraProps || {};

                return (
                    <SlidingButton
                        {...extraProps}
                        className={classNames([
                            styles.icon,
                            extraClassNames,
                            {
                                [styles.additional]: i > 0,
                            },
                        ])}
                        style={slidingStyles[i]}
                    />
                );
            })}
        </div>
    );
};

SlidingButtons.propTypes = propTypes;
SlidingButtons.defaultProps = defaultProps;

export default SlidingButtons;
