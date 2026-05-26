import preview from '#.storybook/preview';
import { useState } from 'react';

import SliderPixel from '../components/SliderPixel';

const meta = preview.meta({
    component: SliderPixel,
    title: 'Fields/SliderPixel',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <SliderPixel value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
