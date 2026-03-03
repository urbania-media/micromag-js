/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import UrlField from '../components/Url';

export default {
    component: Text,
    title: 'Fields/Url',
};

const FieldContainer = (props) => {
    const { value: initialValue = null, ...otherProps } = props || {};
    const [value, setValue] = useState(initialValue);

    return (
        <div className="container mt-4">
            <UrlField value={value} onChange={setValue} {...otherProps} />
        </div>
    );
};

export const normal = () => <FieldContainer />;

export const withUrl = () => <FieldContainer value="http://urbania.ca/woohoo" />;
