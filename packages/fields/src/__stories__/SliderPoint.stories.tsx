import preview from '#.storybook/preview';
import { useState } from 'react';

import SliderPoint from '../components/SliderPoint';

const meta = preview.meta({
    component: SliderPoint,
    title: 'Fields/SliderPoint',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <SliderPoint value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
