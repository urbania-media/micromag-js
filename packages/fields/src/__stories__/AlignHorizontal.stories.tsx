import preview from '#.storybook/preview';
import { useState } from 'react';

import AlignHorizontal from '../components/AlignHorizontal';

const meta = preview.meta({
    component: AlignHorizontal,
    title: 'Fields/AlignHorizontal',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <AlignHorizontal value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
