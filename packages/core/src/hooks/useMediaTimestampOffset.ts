import { useEffect, useRef, useState } from 'react';

import { getMediaTimestampOffset } from '../utils';

function useMediaTimestampOffset(element, { attributeName = 'data-ts-offset' } = {}) {
    const [timestampOffset, setTimestampOffset] = useState(() =>
        getMediaTimestampOffset(element, attributeName),
    );
    const observerRef = useRef(null);

    useEffect(() => {
        if (element !== null) {
            observerRef.current = new MutationObserver((mutations) => {
                mutations.forEach(({ type: mutationType }) => {
                    if (mutationType === 'attributes') {
                        setTimestampOffset(getMediaTimestampOffset(element, attributeName));
                    }
                });
            });

            observerRef.current.observe(element, {
                attributes: true,
                attributeFilter: [attributeName],
            });
        }

        return () => {
            if (observerRef.current !== null) {
                observerRef.current.disconnect();
            }
        };
    }, [element, attributeName]);

    return timestampOffset;
}

export default useMediaTimestampOffset;
