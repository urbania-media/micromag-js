import { SpringValue, animated } from '@react-spring/web';
import classNames from 'classnames';
import React, { RefObject, memo } from 'react';
import { useIntl } from 'react-intl';

import type { MediaElement, RenderContext, ScreenComponent } from '@micromag/core';

import ViewerScreen from './ViewerScreen';

import styles from '../styles/viewer.module.css';

export type ViewerTransitionType = 'stack' | 'carousel';

interface ViewerScreenSectionProps {
    screen: ScreenComponent | null;
    index: number;
    screensCount: number;
    current?: boolean;
    active?: boolean;
    preload?: boolean;
    visible?: boolean;
    /** Current screen once the transition is over */
    settled?: boolean;
    screenState?: string | null;
    progress: SpringValue<number>;
    transitionType: ViewerTransitionType;
    neighborScreensActive: number;
    neighborScreenOffset: number;
    neighborScreenScale: number;
    mediasRef: RefObject<(MediaElement | null)[]>;
    renderContext?: RenderContext | null;
    width?: number | null;
    height?: number | null;
    scale?: number | null;
}

function getScreenStyles(
    index: number,
    spring: SpringValue<number>,
    {
        transitionType,
        screensCount,
        neighborScreensActive,
        neighborScreenOffset,
        neighborScreenScale,
    }: {
        transitionType: ViewerTransitionType;
        screensCount: number;
        neighborScreensActive: number;
        neighborScreenOffset: number;
        neighborScreenScale: number;
    },
) {
    if (transitionType === 'stack') {
        return {
            zIndex: index,
            opacity: spring.to((progress) => {
                const t = index - progress;
                const invert = Math.min(1, Math.max(0, -t));
                if (Math.abs(t) > neighborScreensActive) return 0;
                return Math.min(Math.max(0, 1 - 0.75 * invert + (t + 1)), 1);
            }),
            transform: spring.to((progress) => {
                const t = index - progress;
                const clamped = Math.min(1, Math.max(0, t));
                const invert = Math.min(1, Math.max(0, -t));
                if (Math.abs(t) > neighborScreensActive) return 'translateX(100%)';
                return `translateX(${clamped * 100}%) scale(${1 - 0.2 * invert})`;
            }),
            boxShadow: spring.to((progress) => {
                const t = index - progress;
                if (Math.abs(t) > neighborScreensActive) return null;
                const clamped = Math.min(1, Math.max(0, t));
                return `0 0 ${2 * (1 - clamped)}rem ${-0.5 * (1 - clamped)}rem black`;
            }),
        };
    }

    return {
        opacity: spring.to((progress) => {
            const t = index - progress;
            if (Math.abs(t) > neighborScreensActive) return 0;
            const clamped = Math.min(1, Math.max(0, Math.abs(t)));
            return 1 - 0.75 * clamped;
        }),
        transform: spring.to((progress) => {
            const t = index - progress;
            if (Math.abs(t) > neighborScreensActive) return `translate(100%)`;
            const clamped = Math.min(1, Math.max(0, Math.abs(t)));
            return `translateX(${t * neighborScreenOffset}%) scale(${
                1 - (1 - neighborScreenScale) * clamped
            })`;
        }),
        zIndex: screensCount - index,
    };
}

/**
 * One screen of the viewer and its animated container. Its own component so that, with the
 * React compiler, the screens whose props don't change are not rendered again at each screen
 * change (the cost grew with the number of screens in the story).
 */
function ViewerScreenSection({
    screen,
    index,
    screensCount,
    current = false,
    active = false,
    preload = false,
    visible = false,
    settled = false,
    screenState = null,
    progress,
    transitionType,
    neighborScreensActive,
    neighborScreenOffset,
    neighborScreenScale,
    mediasRef,
    renderContext = null,
    width = null,
    height = null,
    scale = null,
}: ViewerScreenSectionProps) {
    const intl = useIntl();
    const screenStyles = getScreenStyles(index, progress, {
        transitionType,
        screensCount,
        neighborScreensActive,
        neighborScreenOffset,
        neighborScreenScale,
    });
    return (
        <animated.section
            id={current ? 'content' : null}
            aria-hidden={!current}
            style={screenStyles}
            tabIndex={current ? 0 : -1}
            aria-label={intl.formatMessage(
                {
                    defaultMessage: 'Content of screen {index}',
                    description: 'Aria label',
                },
                {
                    index: index + 1,
                },
            )}
            className={classNames([
                styles.screenContainer,
                {
                    [styles.visible]: visible,
                    [styles.preload]: preload,
                    [styles.current]: settled,
                },
            ])}
        >
            {screen !== null ? (
                <ViewerScreen
                    className={styles.screen}
                    screen={screen}
                    screenState={screenState}
                    index={index}
                    current={current}
                    active={active}
                    preload={preload}
                    mediaRef={(ref) => {
                        mediasRef.current[index] = ref;
                    }}
                    renderContext={renderContext}
                    width={width}
                    height={height}
                    scale={scale}
                />
            ) : null}
        </animated.section>
    );
}

// `memo`: the React compiler recreates the list of sections in `Viewer` as a whole when one of them
// changes, so without it every section rendered again at each render of the viewer, with equal props.
export default memo(ViewerScreenSection);
