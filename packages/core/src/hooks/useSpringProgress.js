
import { useSpring } from '@react-spring/core';
import { useEffect, useCallback, useState } from 'react';

const getValueFromSpring = (s) => {
    const { value: v = null } = s || {};
    const { progress: p } = v || {};

    return p;
};

const useSpringProgress = (initialProgress = 1, extras = {}) => {
    // const [springValue, api] = useSpring(() => ({
    //     progress: initialProgress,
    //     ...extras,
    // }));
    // useEffect(() => {
    //     console.log('START');
    //     api.start({ progress: initialProgress, ...extras });
    // }, [initialProgress, extras, api]);
    // const progress = springValue.progress.get();
    // console.log(progress);

    // return progress;

    // return initialProgress;



    const [progress, setProgress] = useState(initialProgress);
    const onChange = useCallback((spring) => setProgress(getValueFromSpring(spring)), [setProgress]);
    const [, api] = useSpring(() => ({
        progress: initialProgress,
        onChange,
        ...extras,
    }));

    useEffect(() => {
        api.start({ progress: initialProgress, ...extras });
    }, [initialProgress, extras, api]);

    return progress;
};

export default useSpringProgress;

