import preview from '#.storybook/preview';
import React, { useState } from 'react';

import TextEditor from '../components/TextEditor';

const meta = preview.meta({
    component: TextEditor,
    title: 'Fields/TextEditor',

    parameters: {
        intl: true,
    },
});

const FieldContainer = () => {
    const [value, setValue] = useState('Test');
    return <TextEditor value={value} inline onChange={setValue} />;
};

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
