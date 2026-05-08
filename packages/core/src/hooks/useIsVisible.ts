import { useState } from 'react';

import { useIntersectionObserver } from './useObserver';

interface UseIsVisibleOptions {
    rootMargin?: string;
    persist?: boolean;
    disabled?: boolean;
}

const useIsVisible = ({
    rootMargin,
    persist = false,
    disabled = false,
}: UseIsVisibleOptions = {}) => {
    const {
        ref,
        entry: { isIntersecting },
    } = useIntersectionObserver({
        rootMargin,
        disabled,
    });

    const [wasIntersecting, setWasIntersecting] = useState(isIntersecting);
    if (isIntersecting && !wasIntersecting) {
        setWasIntersecting(isIntersecting);
    }

    const isVisible = (!persist && isIntersecting) || (persist && wasIntersecting);

    return {
        ref,
        visible: isVisible,
    };
};

export default useIsVisible;
