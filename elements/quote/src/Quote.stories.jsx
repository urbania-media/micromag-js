import React from 'react';
import Quote from './Quote';

export default {
    component: Quote,
    title: 'Elements/Quote',
};

export const normal = () => <Quote body="This is a quote <strong>with bold</string>" />;
