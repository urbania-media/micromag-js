import { ReactNode, createContext, use, useEffect, useRef, useState } from 'react';

interface PlaybackControlsTheme {
    seekBarOnly?: boolean;
    color?: unknown;
    progressColor?: unknown;
}

export type MediaElement = HTMLVideoElement | HTMLAudioElement | HTMLMediaElement;

export function mediaElementIsPlaying(media: MediaElement | null): boolean {
    return (
        media !== null &&
        !!(media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2)
    );
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
    'use no memo';
    const { setMedia, setIsBackground, media, isBackground, playing } = usePlaybackContext();
    const mediaRef = useRef<HTMLMediaElement | null>(null);

    // Cleanup: clear media registration when this screen deactivates or unmounts.
    // Note: we cannot check mediaRef.current here because React clears callback refs
    // before running effect cleanups, so mediaRef.current is always null at this point.
    useEffect(() => {
        const { current: currentMedia = null } = mediaRef;
        return () => {
            if (active) {
                const shouldPause = currentMedia !== null && mediaElementIsPlaying(currentMedia);
                setMedia(null);
                setIsBackground(false);
                if (shouldPause) {
                    currentMedia.pause();
                }
            }
        };
    }, [active, setMedia, setIsBackground, updateKey]);

    // Play early in the process
    const { current: currentMedia } = mediaRef;
    const shouldForcePlaying =
        active &&
        currentMedia !== null &&
        playing &&
        currentMedia.dataset.forcePlaying !== 'true' &&
        !mediaElementIsPlaying(currentMedia);
    if (shouldForcePlaying) {
        currentMedia.dataset.forcePlaying = 'true';
        currentMedia.play();
    }

    // Register media with context when active and no media is registered
    useEffect(() => {
        if (
            !active ||
            mediaRef.current === null ||
            (mediaRef.current === media && background === isBackground)
        ) {
            return;
        }
        setIsBackground(background);
        setMedia(mediaRef.current);
    }, [active, background, media, updateKey, setMedia, setIsBackground, isBackground]);

    return { ref: mediaRef, isCurrent: active || mediaRef.current === media };
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
        setControlsTheme({ ...defaultControlsThemeValue, ...newTheme });
    };

    const finalSetMedia = (newMedia: MediaElement | null) => {
        setMedia(newMedia);
        setCurrentQualityLevel(null);
    };

    const finalSetPlaying = (value: boolean) => {
        if (value) {
            setControlsSuggestPlay(false);
        }
        setPlaying(value);
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

    const showControls = () => setControlsVisible(true);
    const hideControls = () => {
        setControlsVisible(false);
    };

    const seekByProgress = (progress: number) => {
        if (media !== null && media.duration) {
            seekMedia(media, progress * media.duration);
        }
    };
    const seek = (time: number) => {
        if (media !== null) {
            seekMedia(media, time);
        }
    };

    const hasAudio =
        media !== null &&
        (media.tagName.toLowerCase() === 'audio' || media.dataset.hasAudio === 'true');

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
        mediaSrc: media !== null ? media.currentSrc || media.src || null : null,
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
