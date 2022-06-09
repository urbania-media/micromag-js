import { useEffect, useRef } from 'react';

function useProgressSteps({
    disabled = false,
    currentTime,
    duration,
    onStep = null,
    steps = [0.1, 0.25, 0.5, 0.75, 0.9],
} = {}) {
    const progressStepsReached = useRef({});
    useEffect(() => {
        if (duration === 0 || disabled) {
            return;
        }
        const progress = currentTime / duration;
        const currentSteps = progressStepsReached.current;
        const stepsToTrack = steps.filter(
            (step) => progress > step && typeof currentSteps[step] === 'undefined',
        );
        stepsToTrack.forEach((step) => {
            if (onStep !== null) {
                onStep(step);
            }
            currentSteps[step] = true;
        });
    }, [duration, currentTime, disabled]);
}

export default useProgressSteps;
