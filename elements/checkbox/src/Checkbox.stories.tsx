import React, { useState } from 'react';

import Checkbox from './Checkbox';

export default {
    component: Checkbox,
    title: 'Elements/Checkbox (TODO)',
};

const option = { body: 'Empty checkbox' };

const ContainerWithValue = () => {
    const [value, setValue] = useState(true);
    return <Checkbox option={option} value={value} onChange={setValue} />;
};

const ContainerWithoutValue = () => {
    const [value, setValue] = useState(false);
    return <Checkbox option={option} value={value} onChange={setValue} />;
};

export const checked = () => <ContainerWithValue option={option} value={option} />;

export const unchecked = () => <ContainerWithoutValue option={option} />;
