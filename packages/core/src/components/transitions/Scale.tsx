/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import Transition from './Transition';

function Scale(props) {
    const from = useMemo(() => ({ transform: 'scale(0)' }), []);
    const to = useMemo(() => ({ transform: 'scale(1)' }), []);

    return <Transition {...props} from={from} to={to} />;
}

export default Scale;
