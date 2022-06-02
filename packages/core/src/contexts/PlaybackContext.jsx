/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useState, useMemo, useCallback } from 'react';

const defaultControlsThemeValue = {
    seekBarOnly: false,
    color: null,
    progressColor: null,
};

const defaultValue = {
    playing: false,
    muted: true,
    controls: false,
    controlsVisible: false,
    media: null,
    controlsTheme: defaultControlsThemeValue,
};

export const PlaybackContext = React.createContext({
    ...defaultValue,
    setMuted: () => {},
    setPlaying: () => {},
    setControls: () => {},
    setControlsVisible: () => {},
    setControlsTheme: () => {},
    showControls: () => {},
    hideControls: () => {},
    setMediaElement: () => {},
});

export const usePlaybackContext = () => useContext(PlaybackContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    controls: PropTypes.bool,
    controlsVisible: PropTypes.bool,
    controlsTheme: PropTypes.shape({
        seekBarOnly: PropTypes.bool,
        color: PropTypes.any,
        progressColor: PropTypes.any,
    }),
    muted: PropTypes.bool,
    playing: PropTypes.bool,
};

const defaultProps = {
    ...defaultValue,
};

export const PlaybackProvider = ({
    muted: initialMuted,
    playing: initialPlaying,
    controls: initialControls,
    controlsVisible: initialControlsVisible,
    controlsTheme: initialControlsTheme,
    children,
}) => {
    const [muted, setMuted] = useState(initialMuted);
    const [playing, setPlaying] = useState(initialPlaying);
    const [media, setMedia] = useState(null);
    const [controls, setControls] = useState(initialControls);
    const [controlsVisible, setControlsVisible] = useState(initialControlsVisible);
    const [controlsTheme, setControlsTheme] = useState(initialControlsTheme);

    const finalSetControls = useCallback(
        (newControls) => {
            if (newControls) {
                setControls(true);
                setControlsVisible(true);
            } else {
                setControls(false);
                setControlsVisible(false);
            }
        },
        [setControls, setControlsVisible],
    );

    const finalSetControlsTheme = useCallback(
        (newTheme) => {
            setControlsTheme({ ...defaultControlsThemeValue, ...newTheme });
        },
        [setControlsTheme],
    );

    const showControls = useCallback(() => setControlsVisible(true), [setControlsVisible]);
    const hideControls = useCallback(() => setControlsVisible(false), [setControlsVisible]);

    const value = useMemo(
        () => ({
            muted,
            playing,
            controls,
            controlsVisible,
            media,
            controlsTheme,
            setMuted,
            setPlaying,
            setControls: finalSetControls,
            setControlsVisible,
            setControlsTheme: finalSetControlsTheme,
            showControls,
            hideControls,
            setMedia,
        }),
        [
            muted,
            playing,
            controls,
            controlsVisible,
            controlsTheme,
            media,
            setMuted,
            setPlaying,
            finalSetControls,
            finalSetControlsTheme,
            setControlsVisible,
            setControlsTheme,
            showControls,
            hideControls,
            setMedia,
        ],
    );

    return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
};

PlaybackProvider.propTypes = propTypes;
PlaybackProvider.defaultProps = defaultProps;
