import React from 'react';
import HStack from './HStack';
import VStack from './VStack';

export default {
    component: Stack,
    title: 'Elements/Stack',
};

const cellStyle = {
    textAlign: 'center',
    padding: 20,
    background: '#ddd',
};

const cells = [1, 2, 3, 4, 5].map((number) => (
    <div style={cellStyle} key={`cell-${number}`}>
        {number}
    </div>
));

const spacing = 10;

export const withoutSpacing = () => <HStack items={cells} />;

export const withSpacing = () => <HStack items={cells} spacing={spacing} />;

export const withRow = () => <VStack items={cells} spacing={spacing} />;

export const withRowAround = () => <VStack items={cells} spacing="around" />;
