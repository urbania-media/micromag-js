import preview from '#.storybook/preview';
import React, { useState } from 'react';

import ImagesField from '../components/Images';

const meta = preview.meta({
    component: ImagesField,
    title: 'Fields/ImagesField',

    parameters: {
        intl: true,
    },
});

const FieldContainer = () => {
    const [value, setValue] = useState([]);
    return <ImagesField value={value} onChange={setValue} />;
};

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
