import createDebug from 'debug';
import { ReactNode, createContext, use, useEffect, useRef, useState } from 'react';

import {
    getMediaDuration,
    getMediaFilename,
    getMediaHasAudio,
    getMediaIsPlaying,
    getMediaSrc,
} from '../utils';

import { MediaElement } from '../types';

interface PlaybackControlsTheme {
    seekBarOnly?: boolean;
    color?: unknown;
    progressColor?: unknown;
}

interface PlaybackContext {
    playing: boolean;
    completed: boolean;
    muted: boolean;
    controls: boolean;
    controlsSuggestPlay: boolean;
    controlsVisible: boolean;
    media: MediaElement | null;
    mediaSrc: string | null;
    hasAudio: boolean | null;
    isBackground: boolean;
    controlsTheme: PlaybackControlsTheme | null;
    currentQualityLevel: number | null;
    setMuted: (muted: boolean) => void;
    setPlaying: (playing: boolean) => void;
    setControls: (hasControls: boolean) => void;
    setControlsVisible: (visible: boolean) => void;
    setControlsTheme: (theme: PlaybackControlsTheme | null) => void;
    showControls: () => void;
    hideControls: () => void;
    setMedia: (media: MediaElement | null) => void;
    setCurrentQualityLevel: (qualityLevel: number | null, fromRef?: MediaElement | null) => void;
    setIsBackground: (isBackground: boolean) => void;
    seekByProgress: (progress: number) => void;
    seek: (time: number) => void;
}

const defaultControlsThemeValue: PlaybackControlsTheme = {
    seekBarOnly: false,
    color: null,
    progressColor: null,
};

export const PlaybackContext = createContext<PlaybackContext>({
    playing: false,
    completed: false,
    muted: true,
    controls: false,
    controlsSuggestPlay: false,
    controlsVisible: false,
    hasAudio: false,
    isBackground: false,
    media: null,
    mediaSrc: null,
    controlsTheme: defaultControlsThemeValue,
    currentQualityLevel: null,
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
    seekByProgress: () => {},
    seek: () => {},
});

export const usePlaybackContext = () => use(PlaybackContext);

export const usePlaybackMediaRef = (active = false, background = false, updateKey = null) => {
    const { setMedia, setIsBackground, media, isBackground } = usePlaybackContext();
    const mediaRef = useRef<HTMLMediaElement | null>(null);

    // Cleanup: clear media registration when this screen deactivates or unmounts.
    // Note: we cannot check mediaRef.current here because React clears callback refs
    // before running effect cleanups, so mediaRef.current is always null at this point.
    useEffect(() => {
        const { current: currentMedia = null } = mediaRef;
        return () => {
            if (active) {
                const shouldPause = currentMedia !== null && getMediaIsPlaying(currentMedia);
                setMedia(null);
                setIsBackground(false);
                if (shouldPause) {
                    currentMedia.pause();
                }
            }
        };
    }, [active, setMedia, setIsBackground, updateKey]);

    // Play early in the process
    // const { current: currentMedia } = mediaRef;
    // const shouldForcePlaying =
    //     active &&
    //     currentMedia !== null &&
    //     playing &&
    //     currentMedia.dataset.forcePlaying !== 'true' &&
    //     !getMediaIsPlaying(currentMedia);
    // if (shouldForcePlaying) {
    //     currentMedia.dataset.forcePlaying = 'true';
    //     currentMedia.play();
    // }

    // Register media with context when active and no media is registered
    useEffect(() => {
        if (!active || (mediaRef.current === media && background === isBackground)) {
            return;
        }
        setIsBackground(background);
        setMedia(mediaRef.current);
    }, [active, background, media, updateKey, setMedia, setIsBackground, isBackground]);

    return { ref: mediaRef, isCurrent: active };
};

interface PlaybackProviderProps {
    children: ReactNode;
    controls?: boolean;
    controlsSuggestPlay?: boolean;
    controlsVisible?: boolean;
    controlsTheme?: { seekBarOnly?: boolean; color?: unknown; progressColor?: unknown };
    muted?: boolean;
    playing?: boolean;
    paused?: boolean;
    currentQualityLevel?: number | null;
}

function seekMedia(media: MediaElement | null, time: number) {
    if (media !== null) {
        media.currentTime = time;
    }
}

const debug = createDebug('micromag:media:playback-provider');

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
    const [muted, setMuted] = useState<boolean>(initialMuted);
    const [playing, setPlaying] = useState<boolean>(initialPlaying);
    const [media, setMedia] = useState<MediaElement | null>(null);
    const [mediaSrc, setMediaSrc] = useState<string | null>(null);
    const [hasAudio, setHasAudio] = useState<boolean | null>(null);
    const [isBackground, setIsBackground] = useState<boolean>(false);
    const [controls, setControls] = useState<boolean>(initialControls);
    const [controlsSuggestPlay, setControlsSuggestPlay] = useState<boolean>(
        initialControlsSuggestPlay,
    );
    const [controlsVisible, setControlsVisible] = useState<boolean>(initialControlsVisible);
    const [controlsTheme, setControlsTheme] = useState<PlaybackControlsTheme | null>(
        initialControlsTheme,
    );
    const [currentQualityLevel, setCurrentQualityLevel] = useState<number | null>(
        initialCurrentQualityLevel,
    );

    const finalSetControls = (newControls: boolean) => {
        debug('Set controls: %s', newControls);
        if (newControls) {
            setControls(true);
            setControlsVisible(true);
            setControlsSuggestPlay(false);
        } else {
            setControls(false);
            setControlsVisible(false);
            setControlsSuggestPlay(false);
        }
    };

    const finalSetControlsTheme = (newTheme: PlaybackControlsTheme | null) => {
        debug('Set controls theme: %o', newTheme);
        setControlsTheme({ ...defaultControlsThemeValue, ...newTheme });
    };

    const finalSetMedia = (newMedia: MediaElement | null) => {
        const newSrc = getMediaSrc(newMedia);
        const newHasAudio = getMediaHasAudio(newMedia);
        if (newMedia !== null) {
            debug('Set current media: %s %o', getMediaFilename(newSrc), {
                hasAudio: newHasAudio,
            });
        } else {
            debug('Unset current media');
        }
        setMedia(newMedia);
        setCurrentQualityLevel(null);
        setMediaSrc(newSrc);
        setHasAudio(newHasAudio);
    };

    const finalSetPlaying = (value: boolean) => {
        if (value) {
            setControlsSuggestPlay(false);
        }
        setPlaying(value);
        debug('Set playing: %s', value);
    };

    // Handle media ended
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        const onMediaCompleted = () => setCompleted(true);
        if (media !== null) {
            media.addEventListener('ended', onMediaCompleted);
        }
        return () => {
            if (media !== null) {
                media.removeEventListener('ended', onMediaCompleted);
            }
            setCompleted(false);
        };
    }, [media, setCompleted]);

    const showControls = () => {
        setControlsVisible(true);
        debug('Show controls');
    };
    const hideControls = () => {
        setControlsVisible(false);
        debug('Hide controls');
    };

    const seekByProgress = (progress: number) => {
        const duration = getMediaDuration(media);
        if (media !== null && duration > 0) {
            seekMedia(media, progress * duration);
        }
    };
    const seek = (time: number) => {
        if (media !== null) {
            seekMedia(media, time);
        }
    };

    const finalSetCurrentQualityLevel = (
        level: number | null,
        fromRef: MediaElement | null = null,
    ) => {
        if (fromRef === null || media === null || fromRef === media) {
            setCurrentQualityLevel(level);
        }
    };

    const value = {
        muted,
        playing: playing && !paused,
        completed,
        controls,
        controlsSuggestPlay,
        controlsVisible,
        media,
        mediaSrc,
        hasAudio,
        controlsTheme,
        currentQualityLevel,
        setMuted,
        setIsBackground,
        seekByProgress,
        seek,
        isBackground,
        setPlaying: finalSetPlaying,
        setControls: finalSetControls,
        setControlsSuggestPlay,
        setControlsVisible,
        setControlsTheme: finalSetControlsTheme,
        showControls,
        hideControls,
        setMedia: finalSetMedia,
        setCurrentQualityLevel: finalSetCurrentQualityLevel,
    };

    return <PlaybackContext value={value}>{children}</PlaybackContext>;
}
