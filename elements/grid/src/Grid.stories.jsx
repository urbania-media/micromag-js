/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from './Grid';

export default {
    component: Grid,
    title: 'Elements/Grid',
};

const cellStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ddd',
    height: '100%',
};

const items = [1, 2, 3, 4, 5, 6].map(number => (
    <div style={cellStyle} key={`cell-${number}`}>
        {number}
    </div>
));

const horizontalProps = {
    height: 400,
    items,
    layout: [
        {
            rows: 2,
            columns: [1],
        },
        {
            rows: 1,
            columns: [1, 2, 1],
        },
    ]
};

const verticalProps = {
    height: 400,
    items,
    vertical: true,
    layout: [
        {
            columns: 1,
            rows: [3, 1],
        },
        {
            columns: 1,
            rows: [1, 3],
        },
    ]
};

export const horizontal = () => <Grid {...horizontalProps} spacing={10} />;
export const vertical = () => <Grid {...verticalProps} spacing={10} />;
export const withoutSpacing = () => <Grid {...horizontalProps} />;
