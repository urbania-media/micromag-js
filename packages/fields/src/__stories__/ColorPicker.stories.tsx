import { EditorProvider } from '@micromag/core/contexts';
import React, { useState } from 'react';
// import fieldsManager from '@micromag/fields';
import ColorPicker from '../components/ColorPicker';

export default {
    component: ColorPicker,
    title: 'Fields/ColorPicker',
};

function FieldContainer() {
    const [value, setValue] = useState(null);
    return (
        <EditorProvider story={null}>
            <ColorPicker value={value} onChange={setValue} />
        </EditorProvider>
    );
}

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
