import preview from '#.storybook/preview';
import { useState } from 'react';

import BorderRadius from '../components/BorderRadius';

const meta = preview.meta({
    component: BorderRadius,
    title: 'Fields/BorderRadius',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <BorderRadius value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
