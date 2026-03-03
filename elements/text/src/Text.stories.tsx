import preview from '#.storybook/preview';
import React from 'react';

import Text from './Text';

const meta = preview.meta({
    component: Text,
    title: 'Elements/Text',
});

export const normal = meta.story(() => <Text body="This is a text <strong>with bold</string>" />);
