import { useEffect, useRef, useState } from 'react';

function useMediaReady(
    element: HTMLMediaElement | null,
    { id = null }: { id?: string | null } = {},
) {
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
            if (element !== null && element.readyState > 0 && !ready) {
                setReady(true);
                currentReady = true;
            } else if (ready && element !== null && element.readyState === 0) {
                setReady(false);
                currentReady = false;
            }
            realReady.current = currentReady;
            return currentReady;
        }
        const currentReady = updateReady();
        if (currentReady) {
            return () => {};
        }
        element.addEventListener('loadstart', updateReady);
        element.addEventListener('loadeddata', updateReady);
        element.addEventListener('loadedmetadata', updateReady);
        element.addEventListener('canplay', updateReady);
        element.addEventListener('canplaythrough', updateReady);
        return () => {
            element.removeEventListener('loadstart', updateReady);
            element.removeEventListener('loadeddata', updateReady);
            element.removeEventListener('loadedmetadata', updateReady);
            element.removeEventListener('canplay', updateReady);
            element.removeEventListener('canplaythrough', updateReady);
        };
    }, [element, id]);

    return realReady.current;
}

export default useMediaReady;
