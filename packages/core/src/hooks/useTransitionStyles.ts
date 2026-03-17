import { useSpring, useSpringRef } from '@react-spring/core';
import { useEffect, useCallback } from 'react';

const getValueFromSpring = (s) => {
    const { value: v = null } = s || {};
    const { progress: p } = v || {};

    return p;
};

const useTransitionStyles = (progress = 1, fn = null, extras = {}) => {
    if (fn === null) {
        return progress;
    }
    const onChange = useCallback((spring) => fn(getValueFromSpring(spring)));
    // In react-spring v10, useSpring(fn) without deps resets the spring on every render
    // via a layout effect. Passing a SpringRef prevents this reset behavior.
    const springRef = useSpringRef();
    const [, api] = useSpring(() => ({
        ref: springRef,
        progress,
        onChange,
        ...extras,
    }));

    useEffect(() => {
        api.start({ progress, ...extras });
    }, [progress, fn, extras]);

    return progress;
};

export default useTransitionStyles;



