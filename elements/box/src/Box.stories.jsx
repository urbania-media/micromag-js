import React from 'react';
import Box from './Box';

export default {
    component: Box,
    title: 'Components/Box',
};

const cellStyle = { textAlign: 'center', padding: 20, background: '#ddd' };

const cells = [1, 2, 3, 4, 5].map(number => (
    <div style={cellStyle} key={`cell-${number}`}>
        {number}
    </div>
));

const spacing = 10;

export const withoutSpacing = () => <Box items={cells} />;

export const withSpacing = () => <Box items={cells} spacing={spacing} />;

export const withRow = () => <Box items={cells} spacing={spacing} direction="row" />;

export const withRowAround = () => (
    <Box items={cells} spacing={spacing} direction="row" axisAlign="between" />
);
