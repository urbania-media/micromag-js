import { useEffect, useState } from 'react';

export default function useSupportsWebp() {
    const [supportsWebp, setSupportsWebp] = useState(true);

    useEffect(() => {
        const img = document.createElement('img');
        img.onload = () => {
            setSupportsWebp(img.width > 0 && img.height > 0);
        };
        img.onerror = () => {
            setSupportsWebp(false);
        };
        img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
    }, []);

    return supportsWebp;
}
