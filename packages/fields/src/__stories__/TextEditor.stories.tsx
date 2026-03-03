import React, { useState } from 'react';

import TextEditor from '../components/TextEditor';

export default {
    component: TextEditor,
    title: 'Fields/TextEditor',
    parameters: {
        intl: true,
    },
};

const FieldContainer = () => {
    const [value, setValue] = useState('Test');
    return <TextEditor value={value} inline onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
