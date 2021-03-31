/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import UrlField from '../components/Url';

export default {
    component: Text,
    title: 'Fields/Url',
};

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <UrlField value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = () => <FieldContainer />;
