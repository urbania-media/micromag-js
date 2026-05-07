import { useEffect, useState } from 'react';

function useMediaReady(
    element: HTMLMediaElement | null,
    { id = null }: { id?: string | null } = {},
) {
    const [ready, setReady] = useState(() => element !== null && element.readyState > 0);
    const finalId = id || element;
    const [identifier, setIdentifier] = useState(finalId);
    if (finalId !== identifier) {
        setReady(element !== null && element.readyState > 0);
        setIdentifier(finalId);
    } else if (element === null && ready) {
        setReady(false);
    } else if (!ready && element !== null && element.readyState > 0) {
        setReady(true);
    }

    useEffect(() => {
        if (element === null || ready) {
            return () => {};
        }
        function updateReady() {
            setReady(element.readyState > 0);
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
    }, [element, id, ready]);

    return ready;
}

export default useMediaReady;
