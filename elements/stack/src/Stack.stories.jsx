import React from 'react';
import Stack from './Stack';

export default {
    component: Stack,
    title: 'Components/Stack',
};

const cellStyle = { textAlign: 'center', padding: 20, background: '#ddd' };

const cells = [1, 2, 3, 4, 5].map((number) => (
    <div style={cellStyle} key={`cell-${number}`}>
        {number}
    </div>
));

const spacing = 10;

export const withoutSpacing = () => <Stack items={cells} />;

export const withSpacing = () => <Stack items={cells} spacing={spacing} />;

export const withRow = () => <Stack items={cells} spacing={spacing} direction="row" />;

export const withRowAround = () => (
    <Stack items={cells} spacing={spacing} direction="row" axisAlign="between" />
);
