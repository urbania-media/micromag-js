/* eslint-disable react/jsx-props-no-spreading */
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import { useMediaProgress } from '@micromag/core/hooks';

import styles from '../../styles/partials/seek-bar.module.scss';

const stopDragEventsPropagation = {
    onTouchMove: (e) => e.stopPropagation(),
    onTouchStart: (e) => e.stopPropagation(),
    onTouchEnd: (e) => e.stopPropagation(),
    onPointerMove: (e) => e.stopPropagation(),
    onPointerUp: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
};

function getFormattedTimestamp(secondsWithMs = null) {
    if (secondsWithMs === null || secondsWithMs <= 0) {
        return '00:00';
    }
    const parts = `${secondsWithMs}`.split('.');
    const [fullSeconds = 0] = parts || [];

    const finalFullSeconds = Math.round(fullSeconds);

    const seconds = finalFullSeconds % 60;
    const diff = finalFullSeconds - seconds;
    const minutes = diff > 0 ? diff / 60 : 0;

    return `${String(Math.round(minutes)).padStart(2, '0')}:${String(Math.round(seconds)).padStart(
        2,
        '0',
    )}`;
}

const SHOW_MILLISECONDS_THRESHOLD = 5; // show milliseconds when scrubbing if length of video is shorter than 5 seconds

const propTypes = {
    media: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }), // eslint-disable-line
    ]),
    playing: PropTypes.bool,
    backgroundColor: PropTypes.string,
    progressColor: PropTypes.string,
    onClick: PropTypes.func,
    onSeek: PropTypes.func,
    onSeekStart: PropTypes.func,
    onSeekEnd: PropTypes.func,
    collapsed: PropTypes.bool,
    focusable: PropTypes.bool,
    className: PropTypes.string,
    withSeekHead: PropTypes.bool,
};

const defaultProps = {
    media: null,
    playing: false,
    backgroundColor: null,
    progressColor: null,
    onClick: null,
    onSeek: null,
    onSeekStart: null,
    onSeekEnd: null,
    collapsed: false,
    focusable: true,
    className: null,
    withSeekHead: true,
};

const SeekBar = ({
    media,
    playing,
    backgroundColor,
    progressColor,
    onClick,
    onSeek,
    onSeekStart,
    onSeekEnd,
    collapsed,
    focusable,
    className,
    withSeekHead,
}) => {
    const intl = useIntl();
    const progress = useMediaProgress(media, {
        disabled: !playing,
    });

    const { currentTime = null, duration = null } = media || {};
    const [showTimestamp, setShowTimestamp] = useState(false);

    const onDrag = useCallback(
        ({ xy: [x], elapsedTime, active, tap, currentTarget }) => {
            if (!active && elapsedTime > 300) {
                return;
            }
            if (collapsed) {
                onClick();
                return;
            }
            const { left: elX = 0, width: elWidth = 0 } = currentTarget.getBoundingClientRect();
            const newProgress = Math.max(0, Math.min(1, (x - elX) / elWidth));

            if (onSeek !== null) {
                onSeek(newProgress, tap);
            }
        },
        [onSeek, onClick, collapsed],
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
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ backgroundColor }} />
                    <div
                        className={styles.playHead}
                        style={{
                            left: `${progress * 100}%`,
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
