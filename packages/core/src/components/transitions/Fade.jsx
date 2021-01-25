/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';

import Transition from './Transition';

const Fade = (props) => {
    const from = useMemo(() => ({ opacity: 0 }), []);
    const to = useMemo(() => ({ opacity: 1 }), []);

    return <Transition {...props} from={from} to={to} />;
};

export default Fade;
