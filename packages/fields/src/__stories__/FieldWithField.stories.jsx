/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import FieldWithForm from '../components/FieldWithForm';

export default {
    component: FieldWithForm,
    title: 'Fields/FieldWithForm',
    parameters: {
        intl: true,
    },
};

const props = {
    name: 'heading1',
    field: {
        type: 'text-style',
        className: 'p-0',
    },
    buttonTheme: 'secondary',
    buttonOutline: true,
    labelPath: 'fontFamily',
};

const FieldContainer = () => {
    const [value, setValue] = useState({ fontFamily: 'Georgia' });
    return <FieldWithForm value={value} {...props} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
