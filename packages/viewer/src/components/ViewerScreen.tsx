/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import type { RenderContext, ScreenComponent } from '@micromag/core';
import { Screen } from '@micromag/core/components';

// @todo: remove if validated with team
// import HandTap from './partials/HandTap';
// import ArrowHint from './partials/ArrowHint';
import styles from '../styles/screen.module.css';

interface ViewerScreenProps {
    screen?: ScreenComponent | null;
    renderContext?: RenderContext | null;
    screenState?: string | null;
    current?: boolean;
    active?: boolean;
    preload?: boolean;
    mediaRef?: ((...args: unknown[]) => void) | null;
    width?: number | null;
    index?: number | null;
    height?: number | null;
    scale?: number | null;
    className?: string | null;
}

function ViewerScreen({
    screen = null,
    renderContext = null,
    index = null,
    screenState = null,
    active = true,
    preload = true,
    current = false,
    mediaRef = null,
    width = null,
    height = null,
    scale = null,

    // withNavigationHint,
    className = null,
}: ViewerScreenProps) {
    const [mounted, setMounted] = useState(active || current);
    useEffect(() => {
        let timeout = null;
        if (active !== mounted) {
            timeout = setTimeout(() => {
                setMounted(active);
            }, 200);
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [active, mounted, setMounted, index]);

    if (!mounted && !current) {
        return null;
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={styles.inner}
                style={{
                    width,
                    height,
                    transform: scale !== null ? `scale(${scale})` : null,
                    transformOrigin: scale !== null ? '0 0' : null,
                    opacity: mounted ? 1 : null,
                }}
            >
                {mounted || current ? (
                    <Screen
                        screen={screen}
                        renderContext={renderContext}
                        screenState={screenState}
                        index={index}
                        active={active}
                        preload={preload}
                        current={current}
                        mediaRef={mediaRef}
                    />
                ) : null}
            </div>

            {/* {withNavigationHint ? <HandTap className={styles.navigationHint} /> : null} */}
            {/* {withNavigationHint ? <ArrowHint className={styles.arrowHint} /> : null} */}
        </div>
    );
}

export default ViewerScreen;
