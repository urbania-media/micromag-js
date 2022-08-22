import { useCallback, useRef, useState } from 'react';

const isTouchEvent = (event) => 'touches' in event;

const preventDefault = (event) => {
    if (!isTouchEvent(event)) return false;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
    return false;
};

const preventClickDefault = (e) => {
    if (e.preventDefault) {
        e.preventDefault();
    }

    if (e.stopPropagation) {
        e.stopPropagation();
    }
};

const useLongPress = ({
    onLongPress = null,
    onLongPressStart = null,
    onLongPressEnd = null,
    onClick = null,
    shouldPreventDefault = true,
    preventClick = false,
    // lockOnceTriggered = false,
    delay = 350,
} = {}) => {
    const [pressed, setPressed] = useState(false);
    const [triggered, setTriggered] = useState(false);
    const timeout = useRef(null);
    const target = useRef(null);

    const start = useCallback(
        (event, props) => {
            setPressed(true);

            if (event.target !== null) {
                target.current = event.target;
            }
            if (onLongPressStart !== null) {
                onLongPressStart(event, props);
            }
            timeout.current = setTimeout(() => {
                if (shouldPreventDefault && target.current !== null) {
                    target.current.addEventListener('touchend', preventDefault, { passive: false });
                    target.current.addEventListener('click', preventClickDefault, {
                        passive: false,
                    });
                }
                setTriggered(true);

                if (onLongPress !== null) {
                    onLongPress(event, props);
                    setPressed(false);
                }
                timeout.current = null;
            }, delay);
        },
        [onLongPress, onLongPressStart, delay, setPressed, shouldPreventDefault],
    );

    const clear = useCallback(
        (event, props, shouldTriggerClick = true) => {
            setPressed(false);

            if (preventClick && triggered) {
                return;
            }

            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            } else if (shouldPreventDefault && target.current !== null) {
                preventDefault(event);
                target.current.removeEventListener('touchend', preventDefault);
                setTimeout(() => {
                    target.current.removeEventListener('click', preventClickDefault);
                }, 10);
            }
            if (shouldTriggerClick && !triggered && onClick !== null) {
                onClick(props);
            }
            onLongPressEnd(event, props, triggered);
            setTriggered(false);
        },
        [shouldPreventDefault, onClick, onLongPressEnd, setPressed, triggered, preventClick],
    );

    const bind = (props = null) => ({
        onMouseDown: (e) => start(e, props),
        onTouchStart: (e) => start(e, props),
        onMouseUp: (e) => clear(e, props),
        onMouseLeave: (e) => clear(e, props, false),
        onTouchEnd: (e) => clear(e, props),
    });

    return {
        bind,
        pressed,
        triggered,
    };
};

export default useLongPress;
