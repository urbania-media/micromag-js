import { useCallback, useState } from 'react';
import { useSpring } from '@react-spring/core';
import { useDrag } from '@use-gesture/react';

const useLongPress = ({ duration = 500, progress: initialProgress = 0, onLongPress = null } = {}) => {
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
            // if (onChange !== null) {
            //     onChange(progress, result);
            // }
        },
    }));

    const onDrag = useCallback(
        ({ active: dragActive, event, tap }) => {
            event.preventDefault();
            event.stopPropagation();

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
    }

    return { bind, progress, reset };
};

export default useLongPress;
