import { useSpring, useSpringRef } from '@react-spring/core';
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
    onClick?: (() => void) | null;
    className?: string;
}

function ViewerMenuDot({
    current = false,
    active = false,
    colors = null,
    count = 1,
    subIndex = 0,
    vertical = false,
    onClick = null,
    className = null,
}: ViewerMenuDotProps) {
    const { primary = 'rgba(255, 255, 255, 1)', secondary = 'rgba(255, 255, 255, 0.25)' } =
        colors || {};

    // In react-spring v10, useSpring(fn) without deps resets the spring to its initial
    // value on every render via a layout effect. Passing a dummy SpringRef as `ref`
    // prevents this, so our imperative setDotSpringProps.start() calls are not overridden.
    const springRef = useSpringRef();
    const [dotSpringStyles, setDotSpringProps] = useSpring(() => ({
        ref: springRef,
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
                className,
                {
                    [styles.active]: current,
                    [styles.vertical]: vertical,
                },
            ])}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick !== null) {
                    onClick();
                }
            }}
            tabIndex={-1}
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
