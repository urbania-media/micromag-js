import preview from '#.storybook/preview';
import { useState } from 'react';

import Date from '../components/Date';

const meta = preview.meta({
    component: Date,
    title: 'Fields/Date',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Date value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
