import { useState, useCallback } from 'react';
import checkClickable from '../lib/checkClickable';

function useScreenInteraction({
    screens,
    screenId,
    screenWidth,
    isView = false,
    landscape = false,
    nextScreenWidthPercent = 0.5,
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
    const screenIndex = screens.findIndex(({ id }) => id === screenId);
    const { [screenId]: currentScreenInteractionEnabled = true } = screensInteractionEnabled;

    const updateInteraction = useCallback((newValue) => {
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
    }, [screens, screenId, screensInteractionEnabled, setScreensInteractionEnabled]);

    const enableInteraction = useCallback(() => updateInteraction(true), [updateInteraction]);
    const disableInteraction = useCallback(() => updateInteraction(false), [updateInteraction]);

    const onScreenClick = useCallback(
        (e, index) => {
            if (onClick !== null) {
                onClick(e, index);
            }

            const screensCount = screens.length;
            const tappedCurrent = screenIndex === index;

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
            const hasTappedLeft = tappedCurrent
                ? tapX - contentX < screenWidth * (1 - nextScreenWidthPercent)
                : screenIndex > index;

            if (hasTappedLeft) {
                nextIndex = landscape ? index : Math.max(0, screenIndex - 1);
            } else {
                nextIndex = landscape ? index : Math.min(screensCount - 1, screenIndex + 1);

                const isLastScreen = screenIndex === screensCount - 1;
                if (isLastScreen && onEnd !== null) {
                    onEnd();
                }
            }
            onChangeScreen(nextIndex);
        },
        [
            screenWidth,
            screens,
            screenIndex,
            onClick,
            onEnd,
            onChangeScreen,
            screenIndex,
            screensInteractionEnabled,
            currentScreenInteractionEnabled,
            nextScreenWidthPercent,
            isView,
            landscape,
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
