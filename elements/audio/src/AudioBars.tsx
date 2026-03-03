import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { useDimensionObserver } from '@micromag/core/hooks';

import styles from './styles/audio-bars.module.css';

interface AudioBarsProps {
    progress?: number;
    duration?: number;
    playing?: boolean;
    seek?: (...args: unknown[]) => void;
    play?: (...args: unknown[]) => void;
    className?: string;
}

function AudioBars({
    progress = 0,
    playing = false,
    duration = 0,
    seek = null,
    play = null,
    className = null,
}) {
    const intl = useIntl();
    const { ref: elRef, width: elWidth = null, height: elHeight } = useDimensionObserver();
    const barWidth = 1;
    const barGap = 1;
    const barSize = barWidth + barGap;
    const current = progress * elWidth;
    const [currentSeek, setCurrentSeek] = useState(null);

    const items = useMemo(() => {
        const count = Math.floor(elWidth / barSize);
        return [...Array(count).keys()].map(() => Math.floor(Math.random() * 100));
    }, [elWidth, barSize]);

    const seekFromX = useCallback(
        (x = null) => {
            if (x === null) {
                return;
            }
            const { left: elX, width } = elRef.current.getBoundingClientRect();
            const distance = Math.max(0, Math.min(1, (x - elX) / width));
            if (seek !== null && duration !== null) {
                seek(parseFloat(distance * duration, 10));
            }
            if (!playing && play != null) {
                play();
            }
        },
        [elRef.current, elWidth, duration, playing, seek, play],
    );

    const seekTemporary = useCallback(
        (x) => {
            const { left: elX, width } = elRef.current.getBoundingClientRect();
            const distance = Math.max(0, Math.min(1, (x - elX) / width));
            setCurrentSeek(distance * elWidth);
        },
        [elRef.current, elWidth, setCurrentSeek],
    );

    const onClick = useCallback(
        (e) => {
            if (e) {
                seekFromX(e.clientX || null);
                setCurrentSeek(null);
            }
        },
        [seekFromX, setCurrentSeek],
    );

    const bind = useGesture(
        {
            onDrag: ({ xy: [x], elapsedTime, active }) => {
                if (!active && elapsedTime > 300) {
                    return;
                }
                seekTemporary(x);
            },
            onDragStart: ({ xy: [x], elapsedTime, active }) => {
                if (!active && elapsedTime > 300) {
                    return;
                }
                seekTemporary(x);
            },
            onDragEnd: ({ xy: [x] }) => {
                seekFromX(x);
                setTimeout(() => {
                    setCurrentSeek(null);
                }, 1000);
            },
        },
        { drag: { axis: 'x', filterTaps: true } },
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            ref={elRef}
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                width={`${elWidth}px`}
                height={`${elHeight}px`}
                viewBox={`0 0 ${elWidth} ${elHeight}`}
                className={className}
                xmlSpace="preserve"
            >
                {items.map((size, i) => (
                    <rect
                        key={`bar-${i + 1}`}
                        width={barWidth}
                        height={size}
                        x={i * barSize}
                        y={elHeight / 2 - size / 2}
                        fill={(currentSeek || current) > i * barSize ? 'white' : 'gray'}
                        stroke="black"
                        strokeWidth="0px"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                ))}
            </svg>
            <button
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...bind()}
                onClick={onClick}
                type="button"
                className={styles.seekButton}
                title={intl.formatMessage({
                    defaultMessage: 'Seek',
                    description: 'Button label',
                })}
                aria-label={intl.formatMessage({
                    defaultMessage: 'Seek',
                    description: 'Button label',
                })}
            />
        </div>
    );
}

export default AudioBars;
