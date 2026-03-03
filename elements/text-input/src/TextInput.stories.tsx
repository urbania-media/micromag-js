import React, { useState } from 'react';

import TextInput from './TextInput';

export default {
    component: TextInput,
    title: 'Elements/TextInput',
};

export const normal = () => {
    const [value, setValue] = useState();
    return (
        <TextInput
            label="This is an input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export const multiline = () => {
    const [value, setValue] = useState();
    return (
        <TextInput
            label="This is a multiline input"
            multiline
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export const placeholder = () => {
    const [value, setValue] = useState();
    return (
        <TextInput
            label="PLACEHOLDER"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            textStyle={{ color: '#fff' }}
            placeholderTextStyle={{ color: '#ff00ff', textAlign: 'center' }}
        />
    );
};
