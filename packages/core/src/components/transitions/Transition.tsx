import { useSpring } from '@react-spring/core';
import { animated, config as defaultConfigs } from '@react-spring/web';
import classNames from 'classnames';
import React, { useEffect } from 'react';

import styles from '../../styles/transitions/transition.module.css';

interface TransitionProps {
    fullscreen?: boolean;
    from?: Record<string, unknown>;
    to?: Record<string, unknown>;
    playing?: boolean;
    direction?: 'in' | 'out';
    delay?: number;
    reversible?: boolean;
    duration?: number;
    easing?: (...args: unknown[]) => void;
    config?: { mass?: number; friction?: number; tension?: number };
    children?: React.ReactNode;
    className?: string;
    onStart?: (...args: unknown[]) => void;
    onComplete?: (...args: unknown[]) => void;
}

function Transition({
    fullscreen = false,
    from = null,
    to = null,
    playing = false,
    direction = null,
    delay = 0,
    reversible = true,
    duration = undefined,
    easing = undefined,
    config = null,
    children = null,
    className = null,
    onStart = null,
    onComplete = null,
}) {
    const [springProps, setSpringProps] = useSpring(() => ({}));

    useEffect(() => {
        const immediate = (!playing && direction === 'in') || (playing && direction === 'out');
        const finalPlaying = immediate || playing;
        const reset = reversible && playing && !immediate;
        const finalDuration = duration !== null ? duration : undefined;
        const withDelay = delay > 0 && playing && direction !== 'out';
        const finalConfig =
            easing !== null && defaultConfigs[easing] ? defaultConfigs[easing] || null : config;
        const props = {
            from: finalPlaying ? from : to,
            to: finalPlaying ? to : from,
            immediate,
            delay: withDelay ? delay : null,
            reset,
            onStart,
            onRest: onComplete,
            config:
                finalConfig !== null
                    ? finalConfig
                    : {
                          duration: immediate ? 0 : finalDuration,
                      },
        };
        // Reversible always toggles between from-to (playing) to-from (!playing)
        if (finalPlaying || reversible) {
            setSpringProps.start(props);
        }
        // console.log('fx', { reset, finalPlaying, immediate, reversible });
    }, [
        playing,
        direction,
        delay,
        duration,
        reversible,
        easing,
        config,
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

export default Transition;
