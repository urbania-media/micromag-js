import React from 'react';
import Scroll from './Scroll';

export default {
    component: Scroll,
    title: 'Elements/Scroll',
};

export const normal = () => (
    <Scroll width={320} height={480}>
        <div style={{
            width: '100%',
            height: 2000
        }} />
    </Scroll>
);
