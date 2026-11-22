import { useInsertionEffect, useRef, useState } from 'react';

/**
 * A function that keeps the same identity across renders and always calls the latest `handler`.
 *
 * For handlers passed through context or to many children (ex.: `gotoNextScreen`): they depend on
 * the current screen and on playback, so they changed at each screen change and re-rendered every
 * component that reads them. The latest handler is stored in an insertion effect, which runs before
 * the layout and passive effects of every component, so a child effect never calls an old one.
 */
function useStableHandler<Args extends unknown[], Result>(
    handler: (...args: Args) => Result,
): (...args: Args) => Result {
    const handlerRef = useRef(handler);
    useInsertionEffect(() => {
        handlerRef.current = handler;
    });
    const [stableHandler] = useState(
        () =>
            (...args: Args) =>
                handlerRef.current(...args),
    );
    return stableHandler;
}

export default useStableHandler;
