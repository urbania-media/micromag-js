/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Select from '../components/Select';
import SelectAdvanced from '../components/SelectAdvanced';
import Tokens from '../components/Tokens';

export default {
    component: SelectAdvanced,
    title: 'Fields/Select',
    parameters: {
        intl: true,
    },
};

const props = {
    name: 'heading1',
    options: [
        { value: { coco: 1, lime: 2 }, label: 'Un label' },
        { value: { coco: 3, lime: 2 }, label: 'Un label X' },
        { value: { coco: 1 }, label: 'Un autre label' },
        'lol',
    ],
};

const SelectFieldContainer = () => {
    const [value, setValue] = useState(null);
    return <Select value={value} {...props} onChange={setValue} />;
};

const SelectAdvancedFieldContainer = () => {
    const [value, setValue] = useState(null);
    return <SelectAdvanced value={value} {...props} onChange={setValue} />;
};

const TokensFieldContainer = () => {
    const [value, setValue] = useState(null);
    return <Tokens value={value} {...props} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <SelectFieldContainer />
    </div>
);

export const reactSelect = () => (
    <div className="container mt-4">
        <SelectAdvancedFieldContainer />
    </div>
);

export const tokens = () => (
    <div className="container mt-4">
        <TokensFieldContainer />
    </div>
);
