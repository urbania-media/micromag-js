import React from 'react';
import Transition from './Transition';

const Fade = (props) => {
    return (
        <Transition {...props} from={{ opacity: 0 }} to={{ opacity: 1 }} />
    );
};

export default Fade;
