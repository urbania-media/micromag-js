import preview from '#.storybook/preview';
import { useState } from 'react';

import Textarea from '../components/Textarea';

const meta = preview.meta({
    component: Textarea,
    title: 'Fields/Textarea',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Textarea value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
