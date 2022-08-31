import { useSpring } from '@react-spring/core';
import { useEffect, useCallback, useState } from 'react';

const getValueFromSpring = (s) => {
    const { value: v = null } = s || {};
    const { progress: p } = v || {};

    return p;
};

function useSpringValue(wantedProgress, immediate, params) {
    const [progress, setProgress] = useState(wantedProgress);
    const onChange = useCallback(
        (spring) => setProgress(getValueFromSpring(spring)),
        [setProgress],
    );
    const [, api] = useSpring(() => ({
        progress: wantedProgress,
        onChange,
        immediate,
        ...params,
    }));

    useEffect(() => {
        if (wantedProgress !== null) {
            api.start({ progress: wantedProgress, immediate, ...params });
        }
    }, [wantedProgress, immediate, params, api]);

    return immediate ? wantedProgress : progress;
}

export default useSpringValue;
