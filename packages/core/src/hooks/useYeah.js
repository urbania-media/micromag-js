import { useSpring } from '@react-spring/core';
import { useCallback, useEffect, useRef, useState } from 'react';

// import { animated } from '@react-spring/web';

const useYeah = (toggler = 1, fn = null, springConfig = {}) => {
    if (fn === null) {
        return {};
    }
    const [value = {}, setValue] = useState(fn(toggler));
    const [_, api] = useSpring({
        toggler,
        config: {
            ...springConfig,
            immediate: true,
            onChange: (result) => {
                const { value: springValue = null } = result || {};
                const { toggler: currentTogglerValue = true } = springValue || {};
                const oneIfTrue = currentTogglerValue === true ? 1 : currentTogglerValue;
                const x = oneIfTrue === false ? 0 : oneIfTrue;

                setValue(fn(x));
            },
        },
    });

    useEffect(() => {
        api.start({ toggler, config: springConfig });
    }, [toggler, springConfig]);

    return value;
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
