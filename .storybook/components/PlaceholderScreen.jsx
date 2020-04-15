import React from 'react';
import Screen from './Screen';

const Placeholder = ({ children }) => (
    <Screen width={80} height={120} withBorder>
        {children}
    </Screen>
);

export default Placeholder;
