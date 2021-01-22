/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { useScreenSize } from '../../contexts';
import Transition from './Transition';

const Fade = (props) => {
    const { landscape = false } = useScreenSize();

    const from = useMemo( () => ({ opacity: landscape ? 0.5 : 0 }), [landscape]);
    const to = useMemo( () => ({ opacity: 1}), []);

    return (
        <Transition
            {...props}
            from={from}
            to={to}
        />
    );
};

export default Fade;
