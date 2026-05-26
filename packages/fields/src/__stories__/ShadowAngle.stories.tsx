import preview from '#.storybook/preview';
import { useState } from 'react';

import ShadowAngle from '../components/ShadowAngle';

const meta = preview.meta({
    component: ShadowAngle,
    title: 'Fields/ShadowAngle',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <ShadowAngle value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
