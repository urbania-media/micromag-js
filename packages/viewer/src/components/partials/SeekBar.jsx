/* eslint-disable react/jsx-props-no-spreading */
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useMediaProgress } from '@micromag/core/hooks';

import styles from '../../styles/partials/seek-bar.module.scss';

const propTypes = {
    media: PropTypes.node,
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
        if (onSeekStart !== null) {
            onSeekStart();
        }
    }, [onSeekStart]);

    const onDragEnd = useCallback(() => {
        if (onSeekEnd !== null) {
            onSeekEnd();
        }
    }, [onSeekEnd]);

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
                },
            ])}
        >
            <div className={styles.inner}>
                <div className={styles.progressBar} style={{ backgroundColor }}>
                    <div
                        className={styles.playHead}
                        style={{
                            left: `${progress * 100}%`,
                            backgroundColor: progressColor,
                        }}
                    />
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
