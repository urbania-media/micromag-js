import preview from '#.storybook/preview';
import { useState } from 'react';

import GridLayout from '../components/GridLayout';

const meta = preview.meta({
    component: GridLayout,
    title: 'Fields/GridLayout',
});

const grids = [
    [{ rows: 1, columns: [1, 1] }],
    { rows: 1, columns: [1, 1, 1] },
    { rows: 2, columns: [1, 1] },
    { rows: 2, columns: [1, 1, 1] },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <GridLayout grids={grids} value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
