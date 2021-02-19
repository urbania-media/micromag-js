/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Text from '../components/Text';

export default {
    component: Text,
    title: 'Fields/Text',
};

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Text value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = () => <FieldContainer />;
export const withPrefix = () => <FieldContainer prefix="https://" />;