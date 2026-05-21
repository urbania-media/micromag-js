import preview from '#.storybook/preview';
import { a } from '@react-spring/web';
import React, { useState } from 'react';

import { EditorProvider } from '@micromag/core/contexts';

// import fieldsManager from '@micromag/fields';
import Color from '../components/Color';

const meta = preview.meta({
    component: Color,
    title: 'Fields/Color',
    parameters: {
        intl: true,
    },
});

function FieldContainer() {
    const [value, setValue] = useState({
        color: '#ff0000',
        alpha: 0.5,
    });
    return (
        <EditorProvider story={null}>
            <Color value={value} onChange={setValue} />
        </EditorProvider>
    );
}

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
