import React, { useMemo } from 'react';
import Transition from './Transition';

const Scale = (props) => {

    const from = useMemo( () => ({ transform: 'scale(0)' }), []);
    const to = useMemo( () => ({ transform: 'scale(1)' }), []);

    return (
        <Transition
            {...props}
            from={from}
            to={to}
        />
    );
};

export default Scale;
