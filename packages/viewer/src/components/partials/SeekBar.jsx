/* eslint-disable react/jsx-props-no-spreading */
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { useDimensionObserver, useProgress } from '@micromag/core/hooks';

import styles from '../../styles/partials/seek-bar.module.scss';

const propTypes = {
    media: PropTypes.node,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    playing: PropTypes.bool,
    backgroundColor: PropTypes.string,
    progressColor: PropTypes.string,
    onSeek: PropTypes.func,
    onSeekStart: PropTypes.func,
    onSeekEnd: PropTypes.func,
    focusable: PropTypes.bool,
    className: PropTypes.string,
    withSeekHead: PropTypes.bool,
};

const defaultProps = {
    media: null,
    currentTime: null,
    duration: null,
    playing: false,
    backgroundColor: null,
    progressColor: null,
    onSeek: null,
    onSeekStart: null,
    onSeekEnd: null,
    focusable: true,
    className: null,
    withSeekHead: true,
};

const SeekBar = ({
    media,
    currentTime,
    duration,
    playing,
    backgroundColor,
    progressColor,
    onSeek,
    onSeekStart,
    onSeekEnd,
    focusable,
    className,
    withSeekHead,
}) => {
    const intl = useIntl();
    const [seekProgress, setSeekProgress] = useState(null);
    const [instantSeek, setInstantSeek] = useState(false);
    const progress = useProgress(seekProgress !== null ? seekProgress : currentTime / duration, {
        id: media,
        duration: duration * 1000,
        disabled: !playing || instantSeek,
    });

    const { ref: elRef, width: elWidth = null } = useDimensionObserver();

    const onDrag = useCallback(
        ({ xy: [x], elapsedTime, active, tap }) => {
            if (!active && elapsedTime > 300) {
                return;
            }

            const elX = elRef.current.getBoundingClientRect().left;
            const newProgress = Math.max(0, Math.min(1, (x - elX) / elWidth));

            if (tap) {
                setInstantSeek(true);
            }

            if (duration !== null) {
                setSeekProgress(newProgress);
            }

            if (onSeek !== null && duration !== null) {
                onSeek(newProgress * duration, tap);
            }
        },
        [duration, onSeek, setSeekProgress, elWidth],
    );

    const seekPlayingRef = useRef(null);
    const onDragStart = useCallback(() => {
        seekPlayingRef.current = playing;
        if (onSeekStart !== null) {
            onSeekStart();
        }
    }, [playing, onSeekStart, progress]);

    const onDragEnd = useCallback(() => {
        if (seekPlayingRef.current) {
            setSeekProgress(null);
        }
        seekPlayingRef.current = null;
        if (onSeekEnd !== null) {
            onSeekEnd();
        }
    }, [setSeekProgress, onSeekEnd, playing]);

    useEffect(() => {
        if (seekProgress !== null) {
            setSeekProgress(null);
        }
    }, [media]);

    useEffect(() => {
        if (playing && seekPlayingRef.current === null && seekProgress !== null) {
            setSeekProgress(null);
        }
    }, [media, playing, duration, seekProgress]);

    useEffect(() => {
        if (instantSeek) {
            setInstantSeek(false);
        }
    }, [instantSeek, setInstantSeek]);

    const bind = useGesture(
        {
            onDrag,
            onDragStart,
            onDragEnd,
        },
        { drag: { axis: 'x', filterTaps: true } },
    );

    const finalProgress = seekProgress !== null ? seekProgress : progress;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.withSeekHead]: withSeekHead,
                },
            ])}
        >
            <div className={styles.inner}>
                <div className={styles.progressBar} style={{ backgroundColor }}>
                    <div
                        className={styles.playHead}
                        style={{
                            left: `${finalProgress * 100}%`,
                            backgroundColor: progressColor,
                        }}
                    />
                    <div
                        className={styles.progress}
                        style={{
                            transform: `scaleX(${finalProgress})`,
                            backgroundColor: progressColor,
                        }}
                    />
                    {/* <animated.div
                        className={styles.playHead}
                        style={{
                            left: springProps.x.to((x) => `${x * 100}%`),
                            backgroundColor: progressColor,
                        }}
                    />
                    <animated.div
                        className={styles.progress}
                        style={{
                            transform: springProps.x.to((x) => `scaleX(${x})`),
                            backgroundColor: progressColor,
                        }}
                    /> */}
                </div>
                <button
                    ref={elRef}
                    {...bind()}
                    type="button"
                    className={styles.track}
                    title={intl.formatMessage({
                        defaultMessage: 'Seek',
                        description: 'Button label',
                    })}
                    aria-label={intl.formatMessage({
                        defaultMessage: 'Seek',
                        description: 'Button label',
                    })}
                    tabIndex={focusable ? '0' : '-1'}
                />
            </div>
        </div>
    );
};

SeekBar.propTypes = propTypes;
SeekBar.defaultProps = defaultProps;

export default SeekBar;
