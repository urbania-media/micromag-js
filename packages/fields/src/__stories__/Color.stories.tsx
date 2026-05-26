import preview from '#.storybook/preview';
import { a } from '@react-spring/web';
import React, { useState } from 'react';

import { EditorProvider } from '@micromag/core/contexts';

import { ColorObject } from '../../../core/src/types';
// import fieldsManager from '@micromag/fields';
import ColorField from '../components/Color';

const meta = preview.meta({
    component: ColorField,
    title: 'Fields/Color',
    parameters: {
        intl: true,
    },
});

function FieldContainer(props) {
    const [value, setValue] = useState<ColorObject>({
        color: '#ff0000',
        alpha: 0.5,
    });
    return (
        <EditorProvider story={null}>
            <div style={{ maxWidth: 400 }}>
                <h4>Field</h4>
                <ColorField value={value} onChange={setValue} {...props} />
                <hr />
                <h4>Form</h4>
                <ColorField value={value} onChange={setValue} isForm {...props} />
            </div>
        </EditorProvider>
    );
}

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));

export const disabled = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer disabled />
    </div>
));
