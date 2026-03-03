import preview from '#.storybook/preview';
import React, { useState } from 'react';

import { EditorProvider } from '@micromag/core/contexts';

// import fieldsManager from '@micromag/fields';
import ColorPicker from '../components/ColorPicker';

const meta = preview.meta({
    component: ColorPicker,
    title: 'Fields/ColorPicker',
});

function FieldContainer() {
    const [value, setValue] = useState(null);
    return (
        <EditorProvider story={null}>
            <ColorPicker value={value} onChange={setValue} />
        </EditorProvider>
    );
}

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
