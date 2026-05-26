import preview from '#.storybook/preview';
import { useState } from 'react';

import FontWeight from '../components/FontWeight';

const meta = preview.meta({
    component: FontWeight,
    title: 'Fields/FontWeight',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FontWeight value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
