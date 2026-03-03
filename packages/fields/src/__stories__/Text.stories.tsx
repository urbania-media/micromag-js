/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React, { useState } from 'react';

import Text from '../components/Text';

const meta = preview.meta({
    component: Text,
    title: 'Fields/Text',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Text value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const withPrefix = meta.story(() => <FieldContainer prefix="https://" />);
export const disabled = meta.story(() => <FieldContainer disabled />);
