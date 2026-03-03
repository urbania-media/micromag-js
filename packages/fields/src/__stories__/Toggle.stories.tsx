import preview from '#.storybook/preview';
import React, { useState } from 'react';

import Toggle from '../components/Toggle';

const meta = preview.meta({
    component: Toggle,
    title: 'Fields/Toggle',
});

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <Toggle value={value} onChange={setValue} />;
};

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
