/* eslint-disable react/jsx-props-no-spreading */
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import { useMediaProgress, useMediaBuffered } from '@micromag/core/hooks';

import styles from '../../styles/partials/seek-bar.module.scss';

const stopDragEventsPropagation = {
    onTouchMove: (e) => e.stopPropagation(),
    onTouchStart: (e) => e.stopPropagation(),
    onTouchEnd: (e) => e.stopPropagation(),
    onPointerMove: (e) => e.stopPropagation(),
    onPointerUp: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
};

function getFormattedTimestamp(s, withMilliseconds = false) {
    const parts = `${s}`.split('.');
    const seconds = parts[0];
    const ms = withMilliseconds && parts.length > 1 ? `:${parts[1].substring(0, 3)}` : '';

    return (s - (s %= 60)) / 60 + (9 < seconds ? ':' : ':0') + ~~s + ms; // eslint-disable-line
}

const SHOW_MILLISECONDS_THRESHOLD = 60; // show milliseconds when scrubbing if length of video is shorter than...

const propTypes = {
    media: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }), // eslint-disable-line
    ]),
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
    const progress = useMediaProgress(media, {
        disabled: !playing,
    });
    const percentageLoaded = useMediaBuffered(media);
    const { currentTime = null, duration = null } = media || {};
    const finalProgress =
        progress !== null && duration !== null && !Number.isNaN(progress) && !Number.isNaN(duration)
            ? progress
            : 0;
    const [showTimestamp, setShowTimestamp] = useState(false);


    const onDrag = useCallback(
        ({ xy: [x], elapsedTime, active, tap, currentTarget }) => {
            if (!active && elapsedTime > 300) {
                return;
            }

            const { left: elX, width: elWidth } = currentTarget.getBoundingClientRect();
            const newProgress = Math.max(0, Math.min(1, (x - elX) / elWidth));

            if (onSeek !== null) {
                onSeek(newProgress, tap);
            }
        },
        [onSeek],
    );

    const onDragStart = useCallback(() => {
        setShowTimestamp(true);
        if (onSeekStart !== null) {
            onSeekStart();
        }
    }, [onSeekStart, setShowTimestamp]);

    const onDragEnd = useCallback(() => {
        if (onSeekEnd !== null) {
            setShowTimestamp(false);
            onSeekEnd();
        }
    }, [onSeekEnd, setShowTimestamp]);

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
                {
                    [className]: className !== null,
                    [styles.withSeekHead]: withSeekHead,
                    [styles.showTimestamp]: showTimestamp,
                },
            ])}
            {...stopDragEventsPropagation}
        >
            <div className={styles.inner}>
                <div className={styles.progressBar} style={{ backgroundColor }}>
                    <div
                        className={styles.playHead}
                        style={{
                            left: `${finalProgress * 100}%`,
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
                    </div>
                    <div
                        className={styles.progress}
                        style={{
                            transform: `scaleX(${progress})`,
                            backgroundColor: progressColor,
                        }}
                    />
                    <div
                        className={styles.buffered}
                        style={{
                            transform: `scaleX(${percentageLoaded})`,
                            backgroundColor: progressColor,
                        }}
                    />
                </div>
                <button
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
