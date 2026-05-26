import preview from '#.storybook/preview';
import { useState } from 'react';

import SliderPercentage from '../components/SliderPercentage';

const meta = preview.meta({
    component: SliderPercentage,
    title: 'Fields/SliderPercentage',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <SliderPercentage value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
