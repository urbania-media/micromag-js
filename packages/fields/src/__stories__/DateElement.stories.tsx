import preview from '#.storybook/preview';
import { useState } from 'react';

import DateElement from '../components/DateElement';

const meta = preview.meta({
    component: DateElement,
    title: 'Fields/DateElement',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <DateElement value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
