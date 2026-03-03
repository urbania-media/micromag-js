/* eslint-disable react/no-danger */
import throttle from 'lodash/throttle';
import React, { useEffect, useMemo, useRef } from 'react';

import { useIntersectionObserver } from '../../hooks';

interface DetectorProps {
    throttleDelay?: number | null;
    threshold?: number[];
    onEnter?: ((...args: unknown[]) => void) | null;
    onLeave?: ((...args: unknown[]) => void) | null;
    onChange?: ((...args: unknown[]) => void) | null;
    disabled?: boolean;
    children?: React.ReactNode | null;
    className?: string | null;
}

function Detector({
    throttleDelay = null,
    threshold = undefined,
    onEnter = null,
    onLeave = null,
    onChange = null,
    disabled = false,
    children = null,
    className = null,
}: DetectorProps) {
    const {
        ref,
        entry: { isIntersecting },
    } = useIntersectionObserver({
        threshold,
    });
    const enteredRef = useRef(false);

    const triggerChange = useMemo(() => {
        const callback = (intersecting) => {
            const { current: entered } = enteredRef;
            if (onEnter !== null && intersecting && !entered) {
                onEnter();
            }
            if (onLeave !== null && !intersecting && entered) {
                onLeave();
            }
            if (onChange !== null) {
                onChange(intersecting);
            }
            if (intersecting && !entered) {
                enteredRef.current = true;
            } else if (!intersecting && entered) {
                enteredRef.current = false;
            }
        };
        return throttleDelay !== null
            ? throttle(callback, throttleDelay, {
                  trailing: true,
                  leading: true,
              })
            : callback;
    }, [throttleDelay, onEnter, onLeave, onChange]);

    useEffect(() => {
        if (disabled) {
            return () => {};
        }
        triggerChange(isIntersecting);
        return () => {
            if (throttleDelay !== null) {
                triggerChange.cancel();
            }
        };
    }, [throttleDelay, isIntersecting, disabled, triggerChange]);

    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    );
}

export default Detector;
