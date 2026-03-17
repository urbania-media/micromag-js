import { useSpring, useSpringRef } from '@react-spring/core';
import { animated, config as defaultConfigs } from '@react-spring/web';
import classNames from 'classnames';
import React, { useEffect } from 'react';

import styles from '../../styles/transitions/transition.module.css';

interface TransitionProps {
    fullscreen?: boolean;
    from?: Record<string, unknown> | null;
    to?: Record<string, unknown> | null;
    playing?: boolean;
    direction?: 'in' | 'out' | null;
    delay?: number;
    reversible?: boolean;
    duration?: number;
    easing?: (...args: unknown[]) => void;
    config?: { mass?: number; friction?: number; tension?: number } | null;
    children?: React.ReactNode | null;
    className?: string | null;
    onStart?: ((...args: unknown[]) => void) | null;
    onComplete?: ((...args: unknown[]) => void) | null;
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
}: TransitionProps) {
    // In react-spring v10, useSpring(fn) without deps resets the spring on every render
    // via a layout effect. Passing a SpringRef prevents this reset behavior.
    const springRef = useSpringRef();
    const [springProps, setSpringProps] = useSpring(() => ({
        ref: springRef,
    }));

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
