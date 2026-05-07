import { useSpring } from '@react-spring/core';
import { useState } from 'react';

const getValueFromSpring = (s) => {
    const { value: v = null } = s || {};
    const { progress: p } = v || {};

    return p;
};

function useSpringValue(wantedProgress, immediate, params) {
    const [progress, setProgress] = useState(wantedProgress);
    const onChange = (spring) => setProgress(getValueFromSpring(spring));
    useSpring({
        progress: wantedProgress,
        onChange,
        immediate,
        ...params,
    });
    return immediate ? wantedProgress : progress;
}

export default useSpringValue;
