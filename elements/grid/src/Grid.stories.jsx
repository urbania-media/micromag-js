import React from 'react';
import Grid from './Grid';

export default {
    component: Grid,
    title: 'Elements/Grid',
};

const cellStyle = { textAlign: 'center', padding: 20, background: '#ddd' };

const cells = [1, 2, 3, 4, 5].map(number => (
    <div style={cellStyle} key={`cell-${number}`}>
        {number}
    </div>
));

export const withoutSpacing = () => <Grid items={cells} />;

export const withSpacing = () => <Grid items={cells} spacing={5} />;
