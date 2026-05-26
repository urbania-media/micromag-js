import preview from '#.storybook/preview';
import { useState } from 'react';

import Margin from '../components/Margin';

const meta = preview.meta({
    component: Margin,
    title: 'Fields/Margin',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Margin value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
