/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useState, useMemo } from 'react';

export const PlaybackContext = React.createContext({
    playing: false,
    muted: false,
});

export const usePlaybackContext = () => useContext(PlaybackContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    muted: PropTypes.bool,
    playing: PropTypes.bool,
};

const defaultProps = {
    muted: false,
    playing: false,
};

export const PlaybackProvider = ({ muted: initialMuted, playing: initialPlaying, children }) => {
    const [muted, setMuted] = useState(initialMuted);
    const [playing, setPlaying] = useState(initialPlaying);

    const value = useMemo(
        () => ({
            muted,
            playing,
            setMuted,
            setPlaying,
        }),
        [ muted, playing, setMuted, setPlaying ]
    );

    return (
        <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>
    );
};

PlaybackProvider.propTypes = propTypes;
PlaybackProvider.defaultProps = defaultProps;
