/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React from 'react';

import Button from './Button';

const meta = preview.meta({
    component: Button,
    title: 'Elements/Button',
});

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
    },
};

export const Default = meta.story(() => {
    return <Button>Button</Button>;
});

export const WithStyle = meta.story(() => {
    return <Button {...style}>Button</Button>;
});
