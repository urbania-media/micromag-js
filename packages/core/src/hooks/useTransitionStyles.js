import { useSpring } from '@react-spring/core';
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
    const [, api] = useSpring(() => ({
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
