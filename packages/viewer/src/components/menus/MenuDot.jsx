import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styles from '../../styles/menus/menu-dot.module.scss';

const propTypes = {
    current: PropTypes.bool,
    active: PropTypes.bool,
    colors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    vertical: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    current: false,
    active: false,
    colors: null,
    vertical: false,
    onClick: null,
    className: null,
};

const ViewerMenuDot = ({ current, active, colors, vertical, onClick, className }) => {
    const currentTime = 0;
    const duration = 1;
    const playing = true;
    const animation = false;

    const { primary = 'rgba(255, 255, 255, 1)', secondary = 'rgba(200, 200, 200, 0.5)' } =
        colors || {};

    // TODO: if approved animate progress
    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        config: {
            duration: 0,
        },
    }));

    useEffect(() => {
        if (currentTime === null || duration === null) {
            return;
        }
        const progress = currentTime / duration;
        setSpringProps.start({
            reset: true,
            immediate: !playing,
            from: {
                x: progress,
            },
            to: {
                x: playing ? 1 : progress,
            },
            config: {
                duration: (duration - currentTime) * 1000,
            },
        });
    }, [playing, duration, currentTime, setSpringProps]);

    return (
        <li
            className={classNames([
                styles.container,
                {
                    [styles.active]: current,
                    [styles.vertical]: vertical,
                    [className]: className !== null,
                },
            ])}
            aria-hidden="true"
        >
            <button type="button" className={styles.button} onClick={onClick} tabIndex="-1">
                {animation ? (
                    <animated.div
                        className={styles.progress}
                        style={{
                            transform: springProps.x.to((x) => `scaleX(${x})`),
                            backgroundColor: primary,
                        }}
                    />
                ) : (
                    <span
                        className={styles.dot}
                        style={{
                            backgroundColor: active ? primary : secondary,
                        }}
                    />
                )}
            </button>
        </li>
    );
};
ViewerMenuDot.propTypes = propTypes;
ViewerMenuDot.defaultProps = defaultProps;

export default ViewerMenuDot;
