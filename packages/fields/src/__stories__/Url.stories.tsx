/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React, { useState } from 'react';

import UrlField from '../components/Url';

const meta = preview.meta({
    component: Text,
    title: 'Fields/Url',
});

const FieldContainer = (props) => {
    const { value: initialValue = null, ...otherProps } = props || {};
    const [value, setValue] = useState(initialValue);

    return (
        <div className="container mt-4">
            <UrlField value={value} onChange={setValue} {...otherProps} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);

export const withUrl = meta.story(() => <FieldContainer value="http://urbania.ca/woohoo" />);
