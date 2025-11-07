import { useState, useCallback } from 'react';

import checkClickable from '../lib/checkClickable';

function useScreenInteraction({
    screens,
    screenIndex,
    screenWidth,
    disableCurrentScreenNavigation = false,
    clickOnSiblings = false, // @note not currently used by any component
    nextScreenWidthPercent = 0.5,
    onInteract = null,
    onNavigate = null,
} = {}) {
    const [screensInteractionEnabled, setScreensInteractionEnabled] = useState(
        screens.reduce(
            (map, { id }) => ({
                ...map,
                [id]: true,
            }),
            {},
        ),
    );
    const { id: screenId = screenIndex } = screens[screenIndex] || {};
    const { [screenId]: currentScreenInteractionEnabled = true } = screensInteractionEnabled;

    const updateInteraction = useCallback(
        (newValue) => {
            const { [screenId]: currentValue = true } = screensInteractionEnabled;
            if (currentValue !== newValue) {
                setScreensInteractionEnabled(
                    screens.reduce(
                        (map, { id }) =>
                            screenId === id
                                ? {
                                      ...map,
                                      [id]: newValue,
                                  }
                                : {
                                      ...map,
                                      [id]:
                                          typeof screensInteractionEnabled[id] === 'undefined' ||
                                          screensInteractionEnabled[id] === true,
                                  },
                        {},
                    ),
                );
            }
        },
        [screens, screenId, screensInteractionEnabled, setScreensInteractionEnabled],
    );

    const enableInteraction = useCallback(() => updateInteraction(true), [updateInteraction]);
    const disableInteraction = useCallback(() => updateInteraction(false), [updateInteraction]);

    const interact = useCallback(
        ({ event, target, currentTarget, x, y, index }) => {
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
        },
        [
            screens,
            screenIndex,
            screensInteractionEnabled,
            currentScreenInteractionEnabled,
            nextScreenWidthPercent,
            disableCurrentScreenNavigation,
            clickOnSiblings,
            onInteract,
            onNavigate,
        ],
    );

    return {
        interact,
        currentScreenInteractionEnabled,
        enableInteraction,
        disableInteraction,
    };
}

export default useScreenInteraction;
