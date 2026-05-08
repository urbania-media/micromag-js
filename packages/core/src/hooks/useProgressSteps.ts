import { useEffect, useRef } from 'react';

const defaultSteps = [0.1, 0.25, 0.5, 0.75, 0.9];

function useProgressSteps({
    disabled = false,
    currentTime,
    duration,
    onStep = null,
    steps = defaultSteps,
}) {
    const progressStepsReachedRef = useRef({});
    useEffect(() => {
        if (duration === 0 || disabled) {
            return;
        }
        const progress = currentTime / duration;
        const currentSteps = progressStepsReachedRef.current;
        const stepsToTrack = steps.filter(
            (step) => progress > step && typeof currentSteps[step] === 'undefined',
        );
        stepsToTrack.forEach((step) => {
            if (onStep !== null) {
                onStep(step, { duration, currentTime });
            }
            currentSteps[step] = true;
        });
    }, [duration, currentTime, disabled, onStep, steps]);
}

export default useProgressSteps;
