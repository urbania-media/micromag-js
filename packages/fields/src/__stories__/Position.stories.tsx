import preview from '#.storybook/preview';
import { useState } from 'react';

import Position from '../components/Position';

const meta = preview.meta({
    component: Position,
    title: 'Fields/Position',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Position value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
