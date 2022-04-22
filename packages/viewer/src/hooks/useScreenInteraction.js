import { useState, useCallback } from 'react';
import checkClickable from '../lib/checkClickable';

function useScreenInteraction({
    screens,
    screenIndex,
    screenWidth,
    isView = false,
    clickOnSiblings = false,
    nextScreenWidthPercent = 0.5,
    eventsManager = null,
    onClick = null,
    onEnd = null,
    onChangeScreen = null,
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

    const onScreenClick = useCallback(
        (e, index) => {
            if (onClick !== null) {
                onClick(e, index);
            }

            const screensCount = screens.length;
            const tappedCurrent = screenIndex === index;

            if (eventsManager !== null) {
                eventsManager.emit('tap', e, index);
            }

            if (
                (!isView && tappedCurrent) ||
                checkClickable(e.target) ||
                (tappedCurrent && !currentScreenInteractionEnabled)
            ) {
                return;
            }

            let nextIndex = screenIndex;

            const { left: contentX = 0 } = e.currentTarget.getBoundingClientRect();
            const tapX = e.clientX;
            // console.log(e.clientX, contentX, screenWidth);
            const hasTappedLeft = tappedCurrent
                ? tapX - contentX < screenWidth * (1 - nextScreenWidthPercent)
                : screenIndex > index;

            if (hasTappedLeft) {
                nextIndex = clickOnSiblings ? index : Math.max(0, screenIndex - 1);
                if (eventsManager !== null) {
                    eventsManager.emit('tap_previous', nextIndex);
                }
            } else {
                nextIndex = clickOnSiblings ? index : Math.min(screensCount - 1, screenIndex + 1);

                const isLastScreen = screenIndex === screensCount - 1;
                if (isLastScreen && onEnd !== null) {
                    onEnd();
                    if (eventsManager !== null) {
                        eventsManager.emit('tap_end');
                    }
                } else if (eventsManager) {
                    eventsManager.emit('tap_next', nextIndex);
                }
            }

            if (eventsManager !== null) {
                eventsManager.emit('change_screen', nextIndex);
            }

            onChangeScreen(nextIndex);
        },
        [
            screenWidth,
            screens,
            screenIndex,
            eventsManager,
            onClick,
            onEnd,
            onChangeScreen,
            screenIndex,
            screensInteractionEnabled,
            currentScreenInteractionEnabled,
            nextScreenWidthPercent,
            isView,
            clickOnSiblings,
        ],
    );

    return {
        onClick: onScreenClick,
        currentScreenInteractionEnabled,
        enableInteraction,
        disableInteraction,
    };
}

export default useScreenInteraction;
