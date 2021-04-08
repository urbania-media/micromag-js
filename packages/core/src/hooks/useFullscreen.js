import { useCallback, useEffect, useState } from 'react';
import screenfull from 'screenfull';

const useFullscreen = (element) => {
    const enabled = screenfull.isEnabled;
    const [active, setActive] = useState(false);

    const fullscreen = useCallback(() => {
        if (screenfull.isEnabled) {
            if (typeof element !== 'undefined' && element !== null) {
                screenfull.request(element);
            } else {
                screenfull.request();
            }
        }
    }, [element]);

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
        toggle,
        fullscreen,
        unFullscreen,
        active,
        enabled,
    };
};

export default useFullscreen;
