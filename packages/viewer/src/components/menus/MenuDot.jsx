import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styles from '../../styles/menus/menu-dot.module.scss';

const propTypes = {
    current: PropTypes.number,
    index: PropTypes.number,
    colors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    vertical: PropTypes.bool,
    onClickItem: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    current: 0,
    index: 0,
    colors: null,
    vertical: false,
    onClickItem: null,
    className: null,
};

const ViewerMenuDot = ({ index, current, colors, vertical, onClickItem, className }) => {
    const currentTime = 0;
    const duration = 1;
    const playing = true;
    const animation = false;

    const { primary = 'rgba(255, 255, 255, 1)', secondary = 'rgba(200, 200, 200, 0.5)' } =
        colors || {};

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
                    [styles.active]: current === index,
                    [styles.vertical]: vertical,
                    [className]: className !== null,
                },
            ])}
            key={`item-${index + 1}`}
            aria-hidden="true"
        >
            <button
                type="button"
                className={styles.button}
                onClick={() => {
                    if (onClickItem !== null) {
                        onClickItem(index);
                    }
                }}
                tabIndex="-1"
            >
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
                            backgroundColor: index <= current ? primary : secondary,
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
