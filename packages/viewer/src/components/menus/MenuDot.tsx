import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import React, { useEffect } from 'react';

import styles from '../../styles/menus/menu-dot.module.css';

interface ViewerMenuDotProps {
    current?: boolean;
    active?: boolean;
    colors?: { primary?: string; secondary?: string };
    count?: number;
    subIndex?: number;
    vertical?: boolean;
    onClick?: (...args: unknown[]) => void;
    className?: string;
}

function ViewerMenuDot(
    {
        current = false,
        active = false,
        colors = null,
        count = 1,
        subIndex = 0,
        vertical = false,
        onClick = null,
        className = null,
    },
) {
    const { primary = 'rgba(255, 255, 255, 1)', secondary = 'rgba(255, 255, 255, 0.25)' } =
        colors || {};

    const [dotSpringStyles, setDotSpringProps] = useSpring(() => ({
        scaleX: 0,
        config: {
            tension: 200,
            friction: 30,
        },
    }));

    useEffect(() => {
        const activeRatio = active ? 1 : 0;
        const ratio = count > 1 && current ? (subIndex + 1) / count : activeRatio;
        const scaleX = ratio;
        setDotSpringProps.start({ scaleX, immediate: !current });
    }, [active, current, subIndex, count, setDotSpringProps]);

    return (
        <button
            type="button"
            className={classNames([
                styles.container,
                {
                    [styles.active]: current,
                    [styles.vertical]: vertical,
                    [className]: className !== null,
                },
            ])}
            onClick={(e = null) => {
                if (e !== null) {
                    e.stopPropagation();
                }
                if (onClick !== null) {
                    onClick();
                }
            }}
            tabIndex="-1"
            aria-hidden="true"
        >
            <div
                className={styles.dot}
                style={{
                    backgroundColor: secondary,
                }}
            >
                <animated.div
                    className={styles.progress}
                    style={{
                        ...dotSpringStyles,
                        backgroundColor: primary,
                    }}
                />
            </div>
        </button>
    );
}

export default ViewerMenuDot;
