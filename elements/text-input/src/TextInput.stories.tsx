import preview from '#.storybook/preview';
import React, { useState } from 'react';

import TextInput from './TextInput';

const meta = preview.meta({
    component: TextInput,
    title: 'Elements/TextInput',
});

export const normal = meta.story(() => {
    const [value, setValue] = useState();
    return (
        <TextInput
            label="This is an input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
});

export const multiline = meta.story(() => {
    const [value, setValue] = useState();
    return (
        <TextInput
            label="This is a multiline input"
            multiline
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
});

export const placeholder = meta.story(() => {
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
});
