
import { useSpring } from '@react-spring/core';
import { useEffect, useCallback, useState } from 'react';

const getValueFromSpring = (s) => {
    const { value: v = null } = s || {};
    const { progress: p } = v || {};

    return p;
};

const useSpringProgress = (initialProgress = 1, extras = {}) => {
    const [progress, setProgress] = useState(initialProgress);
    const onChange = useCallback((spring) => setProgress(getValueFromSpring(spring)), [setProgress]);
    const [, api] = useSpring(() => ({
        progress,
        onChange,
        ...extras,
    }));

    useEffect(() => {
        api.start({ progress: initialProgress, ...extras });
    }, [initialProgress, extras]);

    return progress;
};

export default useSpringProgress;

