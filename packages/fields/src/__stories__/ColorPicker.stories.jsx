import React, { useState } from 'react';

import ColorPicker from '../components/ColorPicker';

export default {
    component: ColorPicker,
    title: 'Fields/ColorPicker',
};

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <ColorPicker value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
