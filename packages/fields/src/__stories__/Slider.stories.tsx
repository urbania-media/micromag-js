import preview from '#.storybook/preview';
import { useState } from 'react';

import Slider from '../components/Slider';

const meta = preview.meta({
    component: Slider,
    title: 'Fields/Slider',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Slider value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
