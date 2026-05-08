import { useCallback, useState } from 'react';

import { ScreenComponent } from '@micromag/core';

import checkClickable from '../lib/checkClickable';

interface UseScreenInteractionOptions {
    screens: ScreenComponent[];
    screenIndex: number;
    screenWidth: number;
    disableCurrentScreenNavigation?: boolean;
    clickOnSiblings?: boolean;
    nextScreenWidthPercent?: number;
    onInteract?: ((...args: unknown[]) => void) | null;
    onNavigate?: ((...args: unknown[]) => void) | null;
}

function useScreenInteraction({
    screens,
    screenIndex,
    screenWidth,
    disableCurrentScreenNavigation = false,
    clickOnSiblings = false, // @note not currently used by any component
    nextScreenWidthPercent = 0.5,
    onInteract = null,
    onNavigate = null,
}: UseScreenInteractionOptions) {
    const [screensInteractionEnabled, setScreensInteractionEnabled] = useState<
        Record<string, boolean>
    >(() =>
        screens.reduce(
            (map, { id }) => ({
                [id]: true,
                ...map,
            }),
            {},
        ),
    );
    const { id: screenId } = screens[screenIndex] || {};
    const currentScreenInteractionEnabled = screenId
        ? (screensInteractionEnabled[screenId] ?? true)
        : true;

    const updateInteraction = (newValue) => {
        setScreensInteractionEnabled((prev) => {
            const currentValue = prev?.[screenId] ?? true;
            if (currentValue === newValue) {
                return prev;
            }
            return screens.reduce(
                (map, { id }) =>
                    screenId === id
                        ? { ...map, [id]: newValue }
                        : {
                              ...map,
                              [id]: typeof prev[id] === 'undefined' || prev[id] === true,
                          },
                {},
            );
        });
    };

    const enableInteraction = () => updateInteraction(true);
    const disableInteraction = () => updateInteraction(false);

    const interact = ({ event, target, currentTarget, x, y, index }) => {
        if (onInteract !== null) {
            onInteract({ event, target, currentTarget, index, x, y });
        }

        const screensCount = screens.length;
        const tappedCurrent = screenIndex === index;

        if (
            (disableCurrentScreenNavigation && tappedCurrent) ||
            checkClickable(target) ||
            (tappedCurrent && !currentScreenInteractionEnabled)
        ) {
            return;
        }

        const { width } = currentTarget.getBoundingClientRect();
        const margin = (width - screenWidth) / 2;
        const screenPreviousZone = screenWidth * (1 - nextScreenWidthPercent);
        const previousZone = margin + screenPreviousZone;
        const direction = x < previousZone ? 'previous' : 'next';
        const lastIndex = screensCount - 1;
        let nextIndex = index;

        if (direction === 'previous' && !clickOnSiblings) {
            nextIndex = Math.max(0, screenIndex - 1);
        } else if (direction === 'next' && !clickOnSiblings) {
            nextIndex = Math.min(lastIndex, screenIndex + 1);
        }

        if (onNavigate !== null) {
            onNavigate({
                index,
                newIndex: nextIndex,
                direction,
                end: index === nextIndex && nextIndex === lastIndex,
            });
        }
    };

    return {
        interact,
        currentScreenInteractionEnabled,
        enableInteraction,
        disableInteraction,
    };
}

export default useScreenInteraction;
