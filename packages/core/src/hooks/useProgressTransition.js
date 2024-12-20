import { useCallback, useState } from 'react';

import useTransitionStyles from './useTransitionStyles';

const castToNumber = (t) => {
    const isNumber = typeof t === 'number';
    const fromBool = t === true ? 1 : 0;
    const x = !isNumber ? fromBool : t;

    return x;
};

const useProgressTransition = ({ value = 0, fn: callbackFn = null, params = {} } = {}) => {
    if (callbackFn === null) {
        return { styles: {}, progress: value };
    }

    const [styles, setStyles] = useState(callbackFn(castToNumber(value)));
    const fn = useCallback(
        (p) => {
            setStyles(callbackFn(castToNumber(p)));
        },
        [setStyles, callbackFn],
    );
    const progress = useTransitionStyles(castToNumber(value), fn, params);

    return { styles, progress };
};

export default useProgressTransition;
