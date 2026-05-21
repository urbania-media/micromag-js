import preview from '#.storybook/preview';
import { useState } from 'react';

import ButtonLayout from '../components/ButtonLayout';


const meta = preview.meta({
    component: ButtonLayout,
    title: 'Fields/ButtonLayout',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <ButtonLayout value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
