import preview from '#.storybook/preview';
import { useState } from 'react';

import Fit from '../components/Fit';

const meta = preview.meta({
    component: Fit,
    title: 'Fields/Fit',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Fit value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
