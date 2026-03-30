/* eslint-disable react/jsx-props-no-spreading */
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { flushSync } from 'react-dom';

interface PlaybackControlsTheme {
    seekBarOnly?: boolean;
    color?: unknown;
    progressColor?: unknown;
}

type MediaElement = HTMLVideoElement | HTMLAudioElement | HTMLMediaElement;

function mediaElementIsPlaying(media: MediaElement | null): boolean {
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
    controlsTheme: defaultControlsThemeValue,
    currentQualityLevel: null,
    setMuted: (muted: boolean) => {},
    setPlaying: (playing: boolean) => {},
    setControls: (hasControls: boolean) => {},
    setControlsVisible: (visible: boolean) => {},
    setControlsTheme: (theme: PlaybackControlsTheme | null) => {},
    showControls: () => {},
    hideControls: () => {},
    setMedia: (media: MediaElement | null) => {},
    setCurrentQualityLevel: (qualityLevel: number | null, fromRef?: MediaElement | null) => {},
    setIsBackground: (isBackground: boolean) => {},
});

export const usePlaybackContext = () => useContext(PlaybackContext);

export const usePlaybackMediaRef = (active = false, background = false, updateKey = null) => {
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
    const forcePlayingRef = useRef(false);
    const shouldForcePlaying =
        active &&
        currentMedia !== null &&
        playing &&
        !forcePlayingRef.current &&
        !mediaElementIsPlaying(currentMedia);
    if (shouldForcePlaying) {
        forcePlayingRef.current = true;
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

    return { ref: mediaRef, isCurrent: mediaRef.current === media };
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

    const finalSetControls = useCallback(
        (newControls: boolean) => {
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
        (newTheme: PlaybackControlsTheme | null) => {
            setControlsTheme({ ...defaultControlsThemeValue, ...newTheme });
        },
        [setControlsTheme],
    );

    const finalSetPlaying = useCallback(
        (value: boolean) => {
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
        (level: number | null, fromRef: MediaElement | null = null) => {
            if (fromRef === null || media === null || fromRef === media) {
                setCurrentQualityLevel(level);
            }
        },
        [media, setCurrentQualityLevel],
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
            showControls,
            hideControls,
            setMedia,
            finalSetCurrentQualityLevel,
        ],
    );

    return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
}
