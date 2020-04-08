import React from 'react';
import Button from './Button';

export default {
    component: Button,
    title: 'Components/Button',
};

const testStyle = {
  color: '#000'
}

export const defaultButton = () => <Button>Button</Button>;

export const test = () => <Button style={testStyle} />
