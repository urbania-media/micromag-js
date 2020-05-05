import React, { useState } from 'react';
import TextEditor from '../components/TextEditor';

export default {
    component: TextEditor,
    title: 'Fields/TextEditor',
};

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <TextEditor value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
