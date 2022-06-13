import raf from 'raf';
import { useEffect, useState, useRef } from 'react';

function useProgress(currentProgress, { id = null, duration = 1000, disabled = false } = {}) {
    const [progress, setProgress] = useState(currentProgress);
    const realProgress = useRef(progress);
    const idRef = useRef(id);
    const durationRef = useRef(duration);
    const disabledRef = useRef(disabled);
    if (
        duration !== durationRef.current ||
        disabled !== disabledRef.current ||
        id !== idRef.current
    ) {
        realProgress.current = currentProgress;
        disabledRef.current = disabled;
        idRef.current = id;
    }
    useEffect(() => {
        if (disabled) {
            realProgress.current = currentProgress;
            return () => {};
        }

        durationRef.current = duration;
        // realProgress.current = currentProgress;
        let currentTime = new Date().getTime();
        let handle;
        let canceled = false;
        function tick() {
            if (canceled) {
                return;
            }
            const newTime = new Date().getTime();
            const elapsed = newTime - currentTime;
            currentTime = newTime;
            const step = elapsed / duration;
            const newProgress = realProgress.current + step;
            realProgress.current = Math.max(Math.min(newProgress, 1), 0);
            setProgress(newProgress);
            handle = raf(tick);
        }
        tick();

        return () => {
            canceled = true;
            raf.cancel(handle);
        };
    }, [currentProgress, duration, disabled, id, setProgress]);
    return realProgress.current;
}

export default useProgress;
