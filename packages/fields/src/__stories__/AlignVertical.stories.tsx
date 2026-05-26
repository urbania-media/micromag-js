import preview from '#.storybook/preview';
import { useState } from 'react';

import AlignVertical from '../components/AlignVertical';

const meta = preview.meta({
    component: AlignVertical,
    title: 'Fields/AlignVertical',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <AlignVertical value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
