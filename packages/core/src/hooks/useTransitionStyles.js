import { useSpring } from '@react-spring/core';
import { useEffect, useCallback } from 'react';

/* eslint-disable */
export const easings = {
    linear: (x) => x,
    easeInQuad: (x) => x * x,
    easeOutQuad: (x) => 1 - (1 - x) * (1 - x),
    easeInOutQuad: (x) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2),
    easeInCubic: (x) => x * x * x,
    easeOutCubic: (x) => 1 - (1 - x) ** 3,
    easeInOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2),
    easeInQuart: (x) => x * x * x * x,
    easeOutQuart: (x) => 1 - (1 - x) ** 4,
    easeInOutQuart: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - (-2 * x + 2) ** 4 / 2),
    easeInQuint: (x) => x * x * x * x * x,
    easeOutQuint: (x) => 1 - (1 - x) ** 5,
    easeInOutQuint: (x) => (x < 0.5 ? 16 * x * x * x * x * x : 1 - (-2 * x + 2) ** 5 / 2),
    easeInSine: (x) => 1 - Math.cos((x * Math.PI) / 2),
    easeOutSine: (x) => Math.sin((x * Math.PI) / 2),
    easeInOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
    easeInExpo: (x) => (x === 0 ? 0 : 2 ** (10 * x - 10)),
    easeOutExpo: (x) => (x === 1 ? 1 : 1 - 2 ** (-10 * x)),
    easeInOutExpo: (x) =>
        x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5
            ? 2 ** (20 * x - 10) / 2
            : (2 - 2 ** (-20 * x + 10)) / 2,
    easeInCirc: (x) => 1 - Math.sqrt(1 - x ** 2),
    easeOutCirc: (x) => Math.sqrt(1 - (x - 1) ** 2),
    easeInOutCirc: (x) =>
        x < 0.5
            ? (1 - Math.sqrt(1 - (2 * x) ** 2)) / 2
            : (Math.sqrt(1 - (-2 * x + 2) ** 2) + 1) / 2,
    easeInBack: (x) => c3 * x * x * x - c1 * x * x,
    easeOutBack: (x) => 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2,
    easeInOutBack: (x) =>
        x < 0.5
            ? ((2 * x) ** 2 * ((c2 + 1) * 2 * x - c2)) / 2
            : ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2,
    easeInElastic: (x) =>
        x === 0 ? 0 : x === 1 ? 1 : -(2 ** (10 * x - 10)) * Math.sin((x * 10 - 10.75) * c4),
    easeOutElastic: (x) =>
        x === 0 ? 0 : x === 1 ? 1 : 2 ** (-10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1,
    easeInOutElastic: (x) =>
        x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5
            ? -(2 ** (20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
            : (2 ** (-20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1,
};
/* eslint-enable */

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
