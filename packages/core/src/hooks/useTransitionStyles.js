import { useSpring } from '@react-spring/core';
import { useEffect, useState, useCallback } from 'react';

const castToNumber = t => {
    const isNumber = typeof(t) === 'number';
    const fromBool = t === true ? 1 : 0;
    const x = !isNumber ? fromBool : t;

    return x;
};

const getValueFromSpring = (s) => {
    const { value: v = null } = s || {};
    const { progress: p } = v || {};

    return p;
};

const useTransitionStyles = (progress = 1, fn = null, extras = {}) => {
    if (fn === null) {
        return {};
    }

    const [styles, setStyles] = useState( fn(castToNumber(progress)) );
    const onChange = useCallback( (spring) => setStyles(fn(getValueFromSpring(spring))), []);
    const [, api] = useSpring(() => ({
        progress: castToNumber(progress),
        onChange,
        ...extras,
    }));

    useEffect(() => {
        api.start({ progress: castToNumber(progress), ...extras });
    }, [progress, fn, extras]);

    return styles;
};

export default useTransitionStyles;
