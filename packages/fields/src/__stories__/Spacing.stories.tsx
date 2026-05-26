import preview from '#.storybook/preview';
import { useState } from 'react';

import Spacing from '../components/Spacing';

const meta = preview.meta({
    component: Spacing,
    title: 'Fields/Spacing',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Spacing value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
