import { useSpring } from '@react-spring/core';
import { useCallback, useEffect, useRef, useState } from 'react';

// import { animated } from '@react-spring/web';

const useYeah = (toggler = 1, fn = null, extras = {}) => {
    if (fn === null) {
        return {};
    }

    const castToNumber = t => {
        const isNumber = typeof(t) === 'number';
        const fromBool = t === true ? 1 : 0;
        const x = !isNumber ? fromBool : t;

        return x;
    };

    const getValueFromSpring = (s) => {
        const { value: v = null } = s || {};
        const { toggler: t } = v || {};

        return t;
    };

    const [styles, setStyles] = useState( fn(castToNumber(toggler)) );
    const [props, api] = useSpring(() => ({
        toggler: castToNumber(toggler),
        onChange: s => setStyles(fn(getValueFromSpring(s))),
        ...extras,
    }));

    useEffect(() => {
        api.start({ toggler: castToNumber(toggler), ...extras });
    }, [toggler, fn, extras]);

    return styles;
};

// const useFuck = ({
//     onClick = null,
//     shouldPreventDefault = true,
//     delay = 350,
//     toggler = null,
//     updaterFn = null,
// } = {}) => {
//     const bind = (props = null) => ({
//         // something to fuckWith(props)
//         //
//     });

//     return bind;
// };

export default useYeah;
