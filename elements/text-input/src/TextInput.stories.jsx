import React from 'react';
import TextInput from './TextInput';

export default {
    component: TextInput,
    title: 'Elements/TextInput',
};

export const normal = () => <TextInput body="This is an input" />;
export const multiline = () => <TextInput body="This is a multiline input" multiline />;