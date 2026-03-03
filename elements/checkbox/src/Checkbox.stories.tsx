import preview from '#.storybook/preview';
import React, { useState } from 'react';

import Checkbox from './Checkbox';

const meta = preview.meta({
    component: Checkbox,
    title: 'Elements/Checkbox (TODO)',
});

const option = { body: 'Empty checkbox' };

function ContainerWithValue() {
    const [value, setValue] = useState(true);
    return <Checkbox option={option} value={value} onChange={setValue} />;
}

function ContainerWithoutValue() {
    const [value, setValue] = useState(false);
    return <Checkbox option={option} value={value} onChange={setValue} />;
}

export const checked = meta.story(() => <ContainerWithValue option={option} value={option} />);

export const unchecked = meta.story(() => <ContainerWithoutValue option={option} />);
