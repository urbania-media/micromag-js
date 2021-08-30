import { useCallback, useRef, useState } from 'react';

const isTouchEvent = (event) => 'touches' in event;

const preventDefault = (event) => {
    if (!isTouchEvent(event)) return false;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
    return false;
};

const useLongPress = ({
    onLongPress = null,
    onClick = null,
    shouldPreventDefault = true,
    delay = 300,
} = {}) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef(null);
    const target = useRef(null);

    const start = useCallback(
        (event) => {
            if (event.target !== null) {
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                if (shouldPreventDefault && target.current !== null) {
                    target.current.addEventListener('touchend', preventDefault, { passive: false });
                }
                if (onLongPress !== null) {
                    onLongPress(event);
                }
                setLongPressTriggered(true);
                timeout.current = null;
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault],
    );

    const clear = useCallback(
        (event, shouldTriggerClick = true) => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            } else if (shouldPreventDefault && target.current !== null) {
                preventDefault(event);
                target.current.removeEventListener('touchend', preventDefault);
            }
            if (shouldTriggerClick && !longPressTriggered && onClick !== null) {
                onClick();
            }
            setLongPressTriggered(false);
        },
        [shouldPreventDefault, onClick, longPressTriggered],
    );

    return {
        onMouseDown: (e) => start(e),
        onTouchStart: (e) => start(e),
        onMouseUp: (e) => clear(e),
        onMouseLeave: (e) => clear(e, false),
        onTouchEnd: (e) => clear(e),
    };
};

export default useLongPress;
