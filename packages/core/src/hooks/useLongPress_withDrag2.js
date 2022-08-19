import { useSpring } from '@react-spring/core';
import { useDrag } from '@use-gesture/react';
import { useCallback, useState } from 'react';

const useLongPress = ({
    duration = 500,
    progress: initialProgress = 0,
    onLongPress = null,
    // onLongPressProgress = null,
    onLongPressStart = null,
    onLongPressEnd = null,
    ...props
} = {}) => {
    const [progress, setProgress] = useState(initialProgress);
    const [pressed, setPressed] = useState(false); // @todo initial?

    const [longpressProps, longpressSpringApi] = useSpring(() => ({
        progress,
        config: {
            duration,
        },
        onChange: (result) => {
            const { value = null } = result || {};
            const { progress: currentProgress = null } = value || {};

            if (currentProgress >= 1) {
                if (onLongPress !== null) {
                    onLongPress(result);
                }
                setPressed(true);
                return;
            }
            setProgress(currentProgress);
        },
    }));

    const onDrag = useCallback(
        ({ active: dragActive, first, end, event, tap }) => {
            event.preventDefault();
            event.stopPropagation();

            if (first && onLongPressStart) {
                onLongPressStart(event);
            }

            if (end && onLongPressEnd) {
                onLongPressEnd(event);
            }

            const newProgress = tap || !dragActive ? 0 : 1;

            if (!dragActive && pressed) {
                setProgress(1);
            } else {
                longpressSpringApi.start({ progress: newProgress });
                setProgress(newProgress);
            }
        },
        [setProgress, pressed],
    );

    const bind = useDrag(onDrag, {});
    const reset = () => {
        setPressed(false);
        setProgress(0);
        longpressSpringApi.start({ progress: 0 });
    };

    return { bind, progress, reset };
};

export default useLongPress;
