import { useCallback, useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

const useFullscreen = () => {
    const ref = useRef(null);
    const [enabled, setEnabled] = useState(() => screenfull.isEnabled);
    const [active, setActive] = useState(false);

    const fullscreen = () => {
        const { current: element = null } = ref;
        if (screenfull.isEnabled) {
            if (element !== null) {
                screenfull.request(element);
            } else {
                screenfull.request();
            }
        }
    };

    const unFullscreen = useCallback(() => {
        if (screenfull.isEnabled) {
            screenfull.exit();
        }
    }, []);

    const toggle = useCallback(() => {
        if (!active) {
            fullscreen();
        } else {
            unFullscreen();
        }
    }, [active, fullscreen, unFullscreen]);

    useEffect(() => {
        setEnabled(screenfull.isEnabled);
        const onChange = () => {
            setActive(screenfull.isFullscreen);
        };
        if (screenfull.isEnabled) {
            screenfull.on('change', onChange);
        }
        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', onChange);
            }
        };
    }, []);

    return {
        ref,
        toggle,
        fullscreen,
        unFullscreen,
        active,
        enabled,
    };
};

export default useFullscreen;
