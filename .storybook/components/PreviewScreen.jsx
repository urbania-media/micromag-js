import React from 'react';
import Screen from './Screen';

const Preview = ({ children }) => (
    <Screen
        width={320}
        height={480}
        withBorder
    >
        {children}
    </Screen>
);

export default Preview;
