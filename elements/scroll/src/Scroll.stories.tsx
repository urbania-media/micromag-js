import preview from '#.storybook/preview';
import React from 'react';

import Scroll from './Scroll';

const meta = preview.meta({
    component: Scroll,
    title: 'Elements/Scroll',
});

export const normal = meta.story(() => (
    <Scroll width={320} height={480}>
        <div
            style={{
                width: '100%',
                height: 2000,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
        />
    </Scroll>
));
