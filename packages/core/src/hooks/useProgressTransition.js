import { useCallback, useState } from 'react';

import { useTransitionStyles } from './index';

const castToNumber = (t) => {
    const isNumber = typeof t === 'number';
    const fromBool = t === true ? 1 : 0;
    const x = !isNumber ? fromBool : t;

    return x;
};

const useProgressTransition = ({ value = 0, fn: callbackFn = null, config = {} } = {}) => {
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
    const progress = useTransitionStyles(castToNumber(value), fn, config);

    return { styles, progress };
};

export default useProgressTransition;
