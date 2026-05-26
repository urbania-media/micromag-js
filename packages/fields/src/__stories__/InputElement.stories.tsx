import preview from '#.storybook/preview';
import { useState } from 'react';

import InputElement from '../components/InputElement';

const meta = preview.meta({
    component: InputElement,
    title: 'Fields/InputElement',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <InputElement value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
