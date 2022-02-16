/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';

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

const propTypes = {
    children: PropTypes.node.isRequired,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
};

const defaultProps = {
    currentTime: 0,
    duration: 0,
};

export const ScreenProgressProvider = ({ currentTime, duration, children }) => {
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
};

ScreenProgressProvider.propTypes = propTypes;
ScreenProgressProvider.defaultProps = defaultProps;
