import { useCallback, useEffect, useState } from 'react';
import screenfull from 'screenfull';

const useFullscreen = (element) => {
    
    const enabled = screenfull.isEnabled;
    const [active, setActive] = useState(false);

    const fullscreen = useCallback( () => {
        screenfull.request(element);
    }, [element]);

    const unFullscreen = useCallback( () => {
        screenfull.exit();
    }, []);

    const toggle = useCallback( () => {
        if (!active) {
            fullscreen();
        } else {
            unFullscreen();
        }
    }, [active, fullscreen, unFullscreen]);

    useEffect( () => {
        const onChange = () => {
            setActive(screenfull.isFullscreen);
        }
        screenfull.on('change', onChange);
        return () => {
            screenfull.off('change', onChange);
        };
    }, []);

    return {
        toggle,
        fullscreen,
        unFullscreen,
        active,
        enabled
    };
};

export default useFullscreen;
