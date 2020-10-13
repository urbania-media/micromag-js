import React from 'react';
import Transition from './Transition';

const Scale = (props) => {
    return (
        <Transition
            {...props}
            from={{
                transform: 'scale(0)',
            }}
            to={{
                transform: 'scale(1)',
            }}
        />
    );
};

export default Scale;
