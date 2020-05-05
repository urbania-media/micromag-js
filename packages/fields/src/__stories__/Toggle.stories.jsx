import React, { useState } from 'react';
import Toggle from '../components/Toggle';

export default {
    component: Toggle,
    title: 'Fields/Toggle',
};

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <Toggle value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
