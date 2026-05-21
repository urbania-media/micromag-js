import preview from '#.storybook/preview';
import { useState } from 'react';

import BorderStyle from '../components/BorderStyle';

const meta = preview.meta({
    component: BorderStyle,
    title: 'Fields/BorderStyle',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <BorderStyle value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
