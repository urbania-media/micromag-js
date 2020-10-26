import React from 'react';
import Button from './Button';

export default {
    component: Button,
    title: 'Elements/Button',
};

const testStyle = {
    color: '#000',
};

export const Default = () => <Button>Button</Button>;

export const WithStyle = () => <Button style={testStyle} />;
