/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const ScreenProgressContext = React.createContext({
    currentTime: 0,
    duration: 0,
});

export const useProgress = () => {
    const { progress } = useContext(ScreenProgressContext);
    return progress;
};

export const useSetProgress = () => {
    const { setProgress } = useContext(ScreenProgressContext);
    return setProgress;
};

interface ScreenProgressProviderProps {
    children: React.ReactNode;
    currentTime?: number;
    duration?: number;
}

export function ScreenProgressProvider({ currentTime = 0, duration = 0, children }: ScreenProgressProviderProps) {
    const [progress, setProgress] = useState({ currentTime, duration });

    useEffect(() => {
        setProgress({ currentTime, duration });
    }, [currentTime, duration, setProgress]);

    const resetProgress = useCallback(() => {
        setProgress({ currentTime: 0, duration: 0 });
    }, [setProgress]);

    const value = useMemo(
        () => ({
            ...progress,
            setProgress,
            resetProgress,
        }),
        [progress, setProgress, resetProgress],
    );

    return (
        <ScreenProgressContext.Provider value={value}>{children}</ScreenProgressContext.Provider>
    );
}
