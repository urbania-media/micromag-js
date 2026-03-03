import { useEffect, useState } from 'react';

export function checkWebpSupport() {
    return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img.width > 0 && img.height > 0);
        };
        img.onerror = () => {
            resolve(false);
        };
        img.src =
            'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
    });
}

export default function useSupportsWebp(defaultValue = true) {
    const [supportsWebp, setSupportsWebp] = useState(defaultValue);

    useEffect(() => {
        let canceled = false;
        checkWebpSupport().then((newSupport) => {
            if (!canceled && newSupport !== supportsWebp) {
                setSupportsWebp(newSupport);
            }
        });
        return () => {
            canceled = true;
        };
    }, []);

    return supportsWebp;
}
