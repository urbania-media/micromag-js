import { useEffect, useRef, useState } from 'react';

function useMediaTimestampOffset(element, { attributeName = 'data-ts-offset' } = {}) {
    const getTimestampOffset = () =>
        element !== null && element.hasAttribute(attributeName)
            ? parseFloat(element.getAttribute(attributeName))
            : 0;

    const [timestampOffset, setTimestampOffset] = useState(getTimestampOffset());
    const observerRef = useRef(null);

    useEffect(() => {
        if (element !== null) {
            observerRef.current = new MutationObserver((mutations) => {
                mutations.forEach(({ type: mutationType }) => {
                    if (mutationType === 'attributes') {
                        setTimestampOffset(getTimestampOffset());
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
    }, [element]);

    return timestampOffset;
}

export default useMediaTimestampOffset;
