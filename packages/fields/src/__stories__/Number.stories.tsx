import preview from '#.storybook/preview';
import { useState } from 'react';

import Number from '../components/Number';

const meta = preview.meta({
    component: Number,
    title: 'Fields/Number',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Number value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
