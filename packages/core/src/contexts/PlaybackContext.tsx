/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const defaultControlsThemeValue = {
    seekBarOnly: false,
    color: null,
    progressColor: null,
};

const defaultValue = {
    playing: false,
    paused: false,
    completed: false,
    muted: true,
    controls: false,
    controlsSuggestPlay: false,
    controlsVisible: false,
    media: null,
    controlsTheme: defaultControlsThemeValue,
    currentQualityLevel: null,
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
    setMedia: () => {},
    setCurrentQualityLevel: () => {},
    setIsBackground: () => {},
});

export const usePlaybackContext = () => useContext(PlaybackContext);

export const usePlaybackMediaRef = (active = false, background = false, updateKey = null) => {
    const { setMedia, setIsBackground, media } = usePlaybackContext();
    const mediaRef = useRef<HTMLMediaElement | null>(null);

    // Cleanup: clear media registration when this screen deactivates or unmounts.
    // Note: we cannot check mediaRef.current here because React clears callback refs
    // before running effect cleanups, so mediaRef.current is always null at this point.

    useEffect(
        () => () => {
            if (active) {
                console.log('clear media');
                setMedia(null);
                setIsBackground(false);
            }
        },
        [active, setMedia, setIsBackground],
    );

    // Register media with context when active and no media is registered
    useEffect(() => {
        console.log('try to register media', active, mediaRef.current, media);
        if (!active || mediaRef.current === null || media !== null) {
            return;
        }
        console.log('register media');
        setIsBackground(background);
        setMedia(mediaRef.current);
    }, [active, background, media, updateKey, setMedia, setIsBackground]);

    console.log('usePlaybackMediaRef', mediaRef.current, media);

    return { ref: mediaRef, isCurrent: mediaRef.current === media };
};

interface PlaybackProviderProps {
    children: React.ReactNode;
    controls?: boolean;
    controlsSuggestPlay?: boolean;
    controlsVisible?: boolean;
    controlsTheme?: { seekBarOnly?: boolean; color?: unknown; progressColor?: unknown };
    muted?: boolean;
    playing?: boolean;
    paused?: boolean;
    currentQualityLevel?: number;
}

export function PlaybackProvider({
    muted: initialMuted = true,
    playing: initialPlaying = false,
    paused = false,
    controls: initialControls = false,
    controlsSuggestPlay: initialControlsSuggestPlay = false,
    controlsVisible: initialControlsVisible = false,
    controlsTheme: initialControlsTheme = defaultControlsThemeValue,
    currentQualityLevel: initialCurrentQualityLevel = null,
    children,
}: PlaybackProviderProps) {
    const [muted, setMuted] = useState(initialMuted);
    const [playing, setPlaying] = useState(initialPlaying);
    const [media, setMedia] = useState(null);
    const [isBackground, setIsBackground] = useState(false);
    const [controls, setControls] = useState(initialControls);
    const [controlsSuggestPlay, setControlsSuggestPlay] = useState(initialControlsSuggestPlay);
    const [controlsVisible, setControlsVisible] = useState(initialControlsVisible);
    const [controlsTheme, setControlsTheme] = useState(initialControlsTheme);
    const [currentQualityLevel, setCurrentQualityLevel] = useState(initialCurrentQualityLevel);

    const finalSetControls = useCallback(
        (newControls) => {
            if (newControls) {
                setControls(true);
                setControlsVisible(true);
                setControlsSuggestPlay(false);
            } else {
                setControls(false);
                setControlsVisible(false);
                setControlsSuggestPlay(false);
            }
        },
        [setControls, setControlsVisible, setControlsSuggestPlay],
    );

    const finalSetControlsTheme = useCallback(
        (newTheme) => {
            setControlsTheme({ ...defaultControlsThemeValue, ...newTheme });
        },
        [setControlsTheme],
    );

    const finalSetPlaying = useCallback(
        (value) => {
            if (value) {
                setControlsSuggestPlay(false);
            }
            setPlaying(value);
        },
        [setPlaying, setControlsSuggestPlay],
    );

    // Reset on media change
    useEffect(() => {
        setControlsSuggestPlay(false);
    }, [media, setControlsSuggestPlay]);

    // Handle media ended
    const [completed, setCompleted] = useState(false);
    const onMediaCompleted = useCallback(() => setCompleted(true), [setCompleted]);
    useEffect(() => {
        if (media !== null) {
            media.addEventListener('ended', onMediaCompleted);
        }
        return () => {
            if (media !== null) {
                media.removeEventListener('ended', onMediaCompleted);
            }
            setCompleted(false);
        };
    }, [media, onMediaCompleted, setCompleted]);

    const showControls = useCallback(() => setControlsVisible(true), [setControlsVisible]);
    const hideControls = useCallback(() => {
        setControlsVisible(false);
    }, [setControlsVisible]);

    const hasAudio = useMemo(() => {
        if (media === null || media.tagName.toLowerCase() !== 'video') {
            return false;
        }
        if (media.tagName.toLowerCase() === 'audio') {
            return true;
        }
        if (typeof media.dataset.hasAudio === 'undefined') {
            return null;
        }
        return media.dataset.hasAudio === 'true' || media.dataset.hasAudio === true;
    }, [media]);

    const finalSetCurrentQualityLevel = useCallback(
        (level, fromRef = null) => {
            if (fromRef === null || media === null || fromRef === media) {
                setCurrentQualityLevel(level);
            }
        },
        [setCurrentQualityLevel],
    );

    const value = useMemo(
        () => ({
            muted,
            playing: playing && !paused,
            completed,
            controls,
            controlsSuggestPlay,
            controlsVisible,
            media,
            hasAudio,
            controlsTheme,
            currentQualityLevel,
            setMuted,
            setIsBackground,
            isBackground,
            setPlaying: finalSetPlaying,
            setControls: finalSetControls,
            setControlsSuggestPlay,
            setControlsVisible,
            setControlsTheme: finalSetControlsTheme,
            showControls,
            hideControls,
            setMedia,
            setCurrentQualityLevel: finalSetCurrentQualityLevel,
        }),
        [
            muted,
            playing,
            completed,
            paused,
            controls,
            controlsSuggestPlay,
            controlsVisible,
            controlsTheme,
            media,
            hasAudio,
            currentQualityLevel,
            setMuted,
            setIsBackground,
            isBackground,
            finalSetPlaying,
            finalSetControls,
            finalSetControlsTheme,
            setControlsSuggestPlay,
            setControlsVisible,
            setControlsTheme,
            showControls,
            hideControls,
            setMedia,
            setCurrentQualityLevel,
        ],
    );

    return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
}
