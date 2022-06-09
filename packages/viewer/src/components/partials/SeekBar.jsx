/* eslint-disable react/jsx-props-no-spreading */
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';

import styles from '../../styles/partials/seek-bar.module.scss';

const propTypes = {
    media: PropTypes.node,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    playing: PropTypes.bool,
    backgroundColor: MicromagPropTypes.color,
    progressColor: MicromagPropTypes.color,
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

    const [springProps, setSpringProps] = useSpring(() => ({
        x: currentTime !== null && duration !== null ? currentTime / duration : 0,
        config: {
            duration: 0,
        },
    }));

    const lastMediaRef = useRef(media);
    const mediaChanged = lastMediaRef.current !== media;
    lastMediaRef.current = media;

    const { ref: elRef, width: elWidth = null } = useDimensionObserver();

    useEffect(() => {
        if (currentTime === null || duration === null) {
            return;
        }
        const progress = duration > 0 ? currentTime / duration : 0;
        setSpringProps.start({
            reset: true,
            immediate: !playing || mediaChanged,
            from: {
                x: progress,
            },
            to: {
                x: playing ? 1 : progress,
            },
            config: {
                duration: (duration - currentTime) * 1000,
            },
        });
    }, [playing, duration, currentTime, mediaChanged, setSpringProps]);

    // User events
    const seekFromX = useCallback(
        (x) => {
            const elX = elRef.current.getBoundingClientRect().left;
            const progress = Math.max(0, Math.min(1, (x - elX) / elWidth));

            setSpringProps.start({
                immediate: true,
                to: {
                    x: progress,
                },
            });

            if (onSeek !== null && duration !== null) {
                onSeek(progress * duration);
            }
        },
        [duration, playing, onSeek],
    );

    const bind = useGesture(
        {
            onDrag: ({ xy: [x], elapsedTime, active }) => {
                if (!active && elapsedTime > 300) {
                    return;
                }
                seekFromX(x);
            },
            onPointerDown: () => {
                if (onSeekStart !== null) {
                    onSeekStart();
                }
            },
            onPointerUp: () => {
                if (onSeekEnd !== null) {
                    onSeekEnd();
                }
            }
        },
        { drag: { axis: 'x', filterTaps: true } },
    );

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
                <div
                    className={styles.progressBar}
                    style={{ backgroundColor }}
                >
                    <animated.div
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
                    />
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
