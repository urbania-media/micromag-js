import preview from '#.storybook/preview';
import { useState } from 'react';

import FontStyleTransform from '../components/FontStyleTransform';

const meta = preview.meta({
    component: FontStyleTransform,
    title: 'Fields/FontStyleTransform',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FontStyleTransform value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
