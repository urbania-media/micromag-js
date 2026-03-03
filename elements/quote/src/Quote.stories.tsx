import preview from '#.storybook/preview';
import React from 'react';

import Quote from './Quote';

const meta = preview.meta({
    component: Quote,
    title: 'Elements/Quote',
});

export const normal = meta.story(() => <Quote body="This is a quote <strong>with bold</string>" />);
