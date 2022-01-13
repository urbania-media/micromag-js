/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import VisualField from '../components/Visual';

export default {
    title: 'Fields/Visual',
    component: VisualField,
    parameters: {
        intl: true,
    },
};

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <VisualField value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = () => <FieldContainer />;
