import preview from '#.storybook/preview';
import { useState } from 'react';

import Checkboxes from '../components/Checkboxes';

const meta = preview.meta({
    component: Checkboxes,
    title: 'Fields/Checkboxes',
});

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Checkboxes {...props} value={value} onChange={setValue} options={options} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
