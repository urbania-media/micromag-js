import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import isString from 'lodash/isString';
import { getContrastingColor } from '@micromag/core/utils';
import styles from './styles/seek-bar.module.scss';

const propTypes = {
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    playing: PropTypes.bool,
    backgroundColor: PropTypes.string,
    progressColor: PropTypes.string,
    onSeek: PropTypes.func,
    focusable: PropTypes.bool,
    className: PropTypes.string,
    isSmall: PropTypes.bool,
};

const defaultProps = {
    currentTime: null,
    duration: null,
    playing: false,
    backgroundColor: null,
    progressColor: null,
    onSeek: null,
    focusable: true,
    className: null,
    isSmall: false,
};

const SeekBar = ({
    currentTime,
    duration,
    playing,
    backgroundColor,
    progressColor,
    onSeek,
    focusable,
    className,
    isSmall,
}) => {
    const intl = useIntl();
    const fullColor = isString(backgroundColor) ? { color: backgroundColor, alpha: 1 } : backgroundColor;
    const { color: finalBackgroundColor = 'white' } = fullColor || {};
    const fullProgressColor = isString(progressColor) ? { progressColor, alpha: 1 } : progressColor;
    const alternateColor = useMemo(
        () => fullProgressColor || getContrastingColor(fullProgressColor),
        [fullProgressColor, fullColor],
    );
    const { color: finalProgressColor = null } = alternateColor || {};

    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        config: {
            duration: 0,
        },
    }));

    useEffect(() => {
        if (currentTime === null || duration === null) {
            return;
        }
        const progress = currentTime / duration;
        setSpringProps.start({
            reset: true,
            immediate: !playing,
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
    }, [playing, duration, currentTime, setSpringProps]);

    // User events

    const onSeekClick = useCallback(
        (e) => {
            if (onSeek !== null && duration !== null) {
                const currentTargetRect = e.currentTarget.getBoundingClientRect();
                const seekProgress = (e.pageX - currentTargetRect.left) / currentTargetRect.width;
                onSeek(seekProgress * duration);
            }
        },
        [duration],
    );

    const maxTime = useMemo(
        () => (currentTime > 3600 || duration > 3600 ? 11 : 14),
        [currentTime, duration],
    );

    const formattedCurrrentTime = useMemo(() => {
        if (!isSmall) {
            const date = new Date(null);
            date.setSeconds(currentTime); // specify value for SECONDS here
            return date.toISOString().substring(maxTime, 19);
        }
        return null;
    }, [currentTime, maxTime, isSmall]);

    const formattedDuration = useMemo(() => {
        if (!isSmall) {
            const date = new Date(null);
            date.setSeconds(duration); // specify value for SECONDS here
            return date.toISOString().substring(maxTime, 19);
        }
        return null;
    }, [duration, maxTime, isSmall]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSmall]: isSmall,
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                <div className={styles.progressBar} style={{ backgroundColor: finalBackgroundColor }}>
                    <animated.div
                        className={styles.progress}
                        style={{
                            transform: springProps.x.to((x) => `scaleX(${x})`),
                            backgroundColor: finalProgressColor,
                        }}
                    />
                </div>
                {!isSmall ? (
                    <button
                        type="button"
                        className={styles.button}
                        onClick={onSeekClick}
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
                ): null}
            </div>
            {!isSmall ? (
                <div className={styles.time}>
                    <span className={styles.currentTime}>{formattedCurrrentTime}</span>
                    <span className={styles.duration}>{formattedDuration}</span>
                </div>
            ): null}
        </div>
    );
};

SeekBar.propTypes = propTypes;
SeekBar.defaultProps = defaultProps;

export default SeekBar;
