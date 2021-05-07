import React, { useState } from 'react';

import { EditorProvider } from '@micromag/core/src/contexts';
// import fieldsManager from '@micromag/fields';

import ColorPicker from '../components/ColorPicker';

export default {
    component: ColorPicker,
    title: 'Fields/ColorPicker',
};

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return (
        <EditorProvider story={null}>
            <ColorPicker value={value} onChange={setValue} />
        </EditorProvider>
    );
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
