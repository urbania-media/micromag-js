import React, { useState } from 'react';
import ImagesField from '../components/Images';
// import TextField from '../components/Text';

export default {
    component: ImagesField,
    title: 'Fields/ImagesField',
    parameters: {
        intl: true,
    },
};

const FieldContainer = () => {
    const [value, setValue] = useState([]);
    return <ImagesField value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
