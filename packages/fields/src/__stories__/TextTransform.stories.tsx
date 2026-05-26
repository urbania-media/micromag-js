import preview from '#.storybook/preview';
import { useState } from 'react';

import TextTransform from '../components/TextTransform';

const meta = preview.meta({
    component: TextTransform,
    title: 'Fields/TextTransform',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <TextTransform value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
