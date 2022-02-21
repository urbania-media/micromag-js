/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Button from './Button';

export default {
    component: Button,
    title: 'Elements/Button',
};

const style = {
    textStyle: {
        color: { color: 'yellow' },
        fontStyle: {
            italic: true,
        },
    },
    buttonStyle: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: { color: 'yellow' },
    }
};

export const Default = () => <Button>Button</Button>;

export const WithStyle = () => <Button {...style}>Button</Button>;
