import { SpringValue, animated } from '@react-spring/web';
import classNames from 'classnames';
import React from 'react';

import type { ViewerTheme } from '@micromag/core';
import { easings, getStyleFromColor } from '@micromag/core/utils';

import styles from '../../styles/menus/menu-container.module.css';

interface ViewerMenuContainerProps {
    className?: string | null;
    progressSpring?: SpringValue<number>;
    theme?: ViewerTheme | null;
    children?: React.ReactNode;
}

function ViewerMenuContainer({
    progressSpring,
    theme: viewerTheme = null,
    children = null,
    className = null,
}: ViewerMenuContainerProps) {
    const { background = null } = viewerTheme || {};
    const { color: brandBackgroundColor = null } = background || {};
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');

    return (
        <div
            className={classNames([styles.container, className])}
            style={{ pointerEvents: 'none' }}
        >
            <animated.div
                className={styles.heightContainer}
                style={{
                    opacity: progressSpring,
                    transform: progressSpring.to((p) => `translateY(${(1 - p) * -2}rem)`),
                    pointerEvents: progressSpring.to((p) => (p < 0.25 ? 'none' : 'auto')),
                    zIndex: progressSpring.to((p) => Math.round(2 + p)),
                    ...backgroundColorStyle,
                }}
            >
                {children}
            </animated.div>
            <animated.div
                className={styles.backdrop}
                style={{
                    opacity: progressSpring.to((p) => easings.easeOutQuint(p)),
                }}
            />
        </div>
    );
}

export default ViewerMenuContainer;
