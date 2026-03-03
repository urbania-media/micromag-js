import { useEffect } from 'react';

const useDebounced = (handler, watchedValue, delay = 300) => {
    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            if (handler !== null) {
                handler(watchedValue);
            }
        }, delay);
        return () => {
            clearTimeout(timeoutHandler);
        };
    }, [watchedValue, delay]);
};

export default useDebounced;
