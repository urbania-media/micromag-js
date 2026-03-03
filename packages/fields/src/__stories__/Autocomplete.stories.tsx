import preview from '#.storybook/preview';
import React, { useState } from 'react';

import Autocomplete from '../components/Autocomplete';

const meta = preview.meta({
    component: Autocomplete,
    title: 'Fields/Autocomplete',
});

const items = [
    { label: 'Gato', value: 'cat' },
    { label: 'Perro', value: 'dog' },
    { label: 'Pajaro', value: 'bird' },
    { label: 'Pescado', value: 'fish' },
    { label: 'Caracol', value: 'snail' },
];

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return (
        <Autocomplete value={value} onChange={setValue} items={items} placeholder="email@email" />
    );
};

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
