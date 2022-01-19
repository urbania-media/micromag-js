import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styles from '../../styles/transitions/transition.module.scss';

const propTypes = {
    fullscreen: PropTypes.bool,
    from: PropTypes.objectOf(PropTypes.any),
    to: PropTypes.objectOf(PropTypes.any),
    playing: PropTypes.bool,
    direction: PropTypes.oneOf(['in', 'out']),
    delay: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    onStart: PropTypes.func,
    onComplete: PropTypes.func,
};

const defaultProps = {
    fullscreen: false,
    from: null,
    to: null,
    playing: false,
    direction: null,
    delay: 0,
    duration: undefined,
    easing: undefined,
    children: null,
    className: null,
    onStart: null,
    onComplete: null,
};

function Transition({
    fullscreen,
    from,
    to,
    playing,
    direction,
    delay,
    duration,
    easing,
    children,
    className,
    onStart,
    onComplete,
}) {
    const [springProps, setSpringProps] = useSpring(() => ({}));

    useEffect(() => {
        const immediate = (!playing && direction === 'in') || (playing && direction === 'out');
        const finalPlaying = immediate || playing;
        const reset = playing && !immediate;
        const finalDuration = duration !== null ? duration : undefined;

        const props = {
            from,
            to: finalPlaying ? to : from,
            reset,
            onStart,
            onRest: onComplete,
            config: {
                duration: immediate ? 0 : finalDuration,
            },
        };

        const withDelay = delay > 0 && playing && direction !== 'out';
        let timeout = null;
        if (withDelay) {
            setSpringProps.start({ to: from, immediate: true });
            timeout = setTimeout(() => {
                setSpringProps.start(props);
            }, delay);
        } else {
            setSpringProps.start(props);
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [
        playing,
        direction,
        delay,
        duration,
        easing,
        from,
        to,
        setSpringProps,
        onStart,
        onComplete,
    ]);

    return (
        <animated.div
            style={{ ...springProps }}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.fullscreen]: fullscreen,
                },
            ])}
        >
            {children}
        </animated.div>
    );
}

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;

export default Transition;
