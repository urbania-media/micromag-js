import { useEffect, useState, useRef } from 'react';

function useMediaReady(element, { id = null } = {}) {
    const [ready, setReady] = useState(element !== null && element.readyState > 0);

    const realReady = useRef(ready);

    const lastIdRef = useRef(id);
    const idChanged = lastIdRef.current !== id;
    if (idChanged) {
        realReady.current = false;
        lastIdRef.current = id;
    }

    useEffect(() => {
        if (element === null) {
            return () => {};
        }
        function updateReady() {
            let currentReady = ready;
            if (element.readyState > 0 && !ready) {
                setReady(true);
                currentReady = true;
            } else if (ready && element.readyState === 0) {
                setReady(false);
                currentReady = false;
            }
            realReady.current = currentReady;
            return currentReady;
        }
        const currentReady = updateReady();
        if (!currentReady) {
            element.addEventListener('loadedmetadata', updateReady);
            element.addEventListener('canplay', updateReady);
            element.addEventListener('canplaythrough', updateReady);
        }
        return () => {
            if (!currentReady) {
                element.removeEventListener('loadedmetadata', updateReady);
                element.removeEventListener('canplay', updateReady);
                element.removeEventListener('canplaythrough', updateReady);
            }
        };
    }, [element, id]);

    return realReady.current;
}

export default useMediaReady;
