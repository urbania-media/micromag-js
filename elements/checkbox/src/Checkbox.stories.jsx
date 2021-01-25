import React from 'react';

import Checkbox from './Checkbox';

export default {
    component: Checkbox,
    title: 'Elements/Checkbox (TODO)',
};

const option = 'Example checkbox';

export const checked = () => <Checkbox option={option} value={option} />;

export const unchecked = () => <Checkbox option={option} />;
