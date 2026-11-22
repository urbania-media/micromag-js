import { animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash-es/isString';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { MediaElement } from '@micromag/core/contexts';
import { useMediaCurrentTime, useMediaDuration } from '@micromag/core/hooks';

import useMediaProgressSpring from '../../hooks/useMediaProgressSpring';
import stopDragEventsPropagation from '../../lib/stopDragEventsPropagation';

import styles from '../../styles/partials/seek-bar.module.css';

function getFormattedTimestamp(secondsWithMs = null) {
    if (secondsWithMs === null || secondsWithMs <= 0) {
        return '00:00';
    }
    const parts = `${secondsWithMs}`.split('.');
    const [fullSeconds = 0] = parts || [];

    const finalFullSeconds = Math.round(
        isString(fullSeconds) ? parseInt(fullSeconds) : fullSeconds,
    );

    const seconds = finalFullSeconds % 60;
    const diff = finalFullSeconds - seconds;
    const minutes = diff > 0 ? diff / 60 : 0;

    return `${String(Math.round(minutes)).padStart(2, '0')}:${String(Math.round(seconds)).padStart(
        2,
        '0',
    )}`;
}

const SHOW_MILLISECONDS_THRESHOLD = 5; // show milliseconds when scrubbing if length of video is shorter than 5 seconds

interface SeekBarProps {
    media?: MediaElement;
    playing?: boolean;
    backgroundColor?: string;
    progressColor?: string;
    onClick?: (...args: unknown[]) => void;
    onSeek?: (...args: unknown[]) => void;
    onSeekStart?: (...args: unknown[]) => void;
    onSeekEnd?: (...args: unknown[]) => void;
    collapsed?: boolean;
    focusable?: boolean;
    className?: string;
    withSeekHead?: boolean;
}

function SeekBar({
    media = null,
    playing = false,
    backgroundColor = null,
    progressColor = null,
    onClick = null,
    onSeek = null,
    onSeekStart = null,
    onSeekEnd = null,
    collapsed = false,
    focusable = true,
    className = null,
    withSeekHead = true,
}: SeekBarProps) {
    const intl = useIntl();
    // A spring, not state: the bar moves at every frame without rendering the component
    const progress = useMediaProgressSpring(media, {
        disabled: !playing,
    });
    const [showTimestamp, setShowTimestamp] = useState(false);
    const currentTime = useMediaCurrentTime(media, {
        disabled: !playing && !showTimestamp,
    });
    const duration = useMediaDuration(media, {
        disabled: !playing && !showTimestamp,
    });

    const startProgressRef = useRef(progress.get());

    const onDrag = ({
        xy: [xOffset],
        movement: [xMovement],
        elapsedTime,
        active,
        tap,
        currentTarget,
    }) => {
        if (!active && elapsedTime > 300) {
            return;
        }
        if (collapsed) {
            onClick();
            return;
        }
        const { width: elWidth = 0, x: xGap = null } = currentTarget.getBoundingClientRect();
        let newProgress = null;
        if (tap) {
            newProgress = Math.max(0, Math.min(1, (xOffset - xGap) / elWidth));
        } else {
            // startProgressRef.current + xMovement
            newProgress = Math.max(0, Math.min(1, (xOffset - xGap) / elWidth));
        }
        if (onSeek !== null) {
            onSeek(newProgress, tap);
        }
    };

    const onDragStart = () => {
        startProgressRef.current = progress.get();
        setShowTimestamp(true);
        if (onSeekStart !== null) {
            onSeekStart();
        }
    };

    const onDragEnd = () => {
        if (onSeekEnd !== null) {
            setShowTimestamp(false);
            onSeekEnd();
        }
    };

    const bind = useGesture(
        {
            onDrag,
            onDragStart,
            onDragEnd,
        },
        { drag: { axis: 'x', filterTaps: true } },
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.withSeekHead]: withSeekHead,
                    [styles.showTimestamp]: showTimestamp,
                },
            ])}
            {...stopDragEventsPropagation}
        >
            <div className={styles.inner}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ backgroundColor }} />
                    <animated.div
                        className={styles.playHead}
                        style={{
                            left: progress.to((value) => `${value * 100}%`),
                            backgroundColor: progressColor,
                        }}
                    >
                        <div
                            className={styles.scrubbedTime}
                            style={{
                                borderColor: progressColor,
                            }}
                        >
                            {getFormattedTimestamp(
                                currentTime,
                                duration < SHOW_MILLISECONDS_THRESHOLD,
                            )}
                        </div>
                    </animated.div>
                    <animated.div
                        className={styles.progress}
                        style={{
                            transform: progress.to((value) => `scaleX(${value})`),
                            backgroundColor: progressColor,
                        }}
                    />
                </div>
                <animated.button
                    {...bind()}
                    type="button"
                    role="slider"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    aria-valuetext={intl.formatMessage(
                        {
                            defaultMessage: '{current} of {duration}',
                            description: 'Seek bar value',
                        },
                        {
                            current: getFormattedTimestamp(
                                currentTime,
                                duration < SHOW_MILLISECONDS_THRESHOLD,
                            ),
                            duration: getFormattedTimestamp(
                                duration,
                                duration < SHOW_MILLISECONDS_THRESHOLD,
                            ),
                        },
                    )}
                    data-draggable
                    className={styles.track}
                    title={intl.formatMessage({
                        defaultMessage: 'Seek',
                        description: 'Button label',
                    })}
                    aria-label={intl.formatMessage({
                        defaultMessage: 'Progress slider',
                        description: 'Button label',
                    })}
                    tabIndex={focusable ? '0' : '-1'}
                />
            </div>
        </div>
    );
}

export default SeekBar;
