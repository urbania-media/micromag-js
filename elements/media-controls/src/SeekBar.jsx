import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';

import styles from './styles/seek-bar.module.scss';

const propTypes = {
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    playing: PropTypes.bool,
    backgroundColor: PropTypes.string,
    progressColor: PropTypes.string,
    className: PropTypes.string,
    onSeek: PropTypes.func,
};

const defaultProps = {
    currentTime: null,
    duration: null,
    playing: false,
    backgroundColor: 'white',
    progressColor: 'lightblue',
    className: null,
    onSeek: null,
};

const SeekBar = ({
    currentTime,
    duration,
    playing,
    backgroundColor,
    progressColor,
    className,
    onSeek,
}) => {
    // exact same spring than SeekBar

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
        setSpringProps({
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

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ backgroundColor }}
        >
            <animated.div
                className={styles.progress}
                style={{
                    transform: springProps.x.interpolate((x) => `scaleX(${x}`),
                    backgroundColor: progressColor,
                }}
            />
            <button
                type="button"
                className={styles.button}
                onClick={onSeekClick}
                aria-label="Seek"
            />
        </div>
    );
};

SeekBar.propTypes = propTypes;
SeekBar.defaultProps = defaultProps;

export default SeekBar;
