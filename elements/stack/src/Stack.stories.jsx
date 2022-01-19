import React from 'react';
import Spacer from './Spacer';
import Stack from './Stack';

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

export const withoutSpacing = () => (
    <div>
        <h4>Vertical</h4>
        <Stack direction="vertical">{cells}</Stack>

        <hr />

        <h4>Horizontal</h4>
        <Stack direction="horizontal">{cells}</Stack>
    </div>
);

export const withSpacing = () => (
    <div>
        <h4>Vertical</h4>
        <Stack direction="vertical" spacing={10}>
            {cells}
        </Stack>

        <hr />

        <h4>Horizontal</h4>
        <Stack direction="horizontal" spacing={10}>
            {cells}
        </Stack>
    </div>
);

export const withSpacingAround = () => (
    <div>
        <h4>Vertical</h4>
        <Stack direction="vertical" spacing="around">
            {cells}
        </Stack>

        <hr />

        <h4>Horizontal</h4>
        <Stack direction="horizontal" spacing="around">
            {cells}
        </Stack>
    </div>
);

export const withSpacer = () => (
    <div>
        <h4>Horizontal</h4>
        <Stack direction="horizontal">
            <div style={cellStyle}>1</div>

            <Spacer />

            <div style={cellStyle}>2</div>
            <div style={cellStyle}>3</div>
            <div style={cellStyle}>4</div>
        </Stack>
    </div>
);
