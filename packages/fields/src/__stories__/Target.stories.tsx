import preview from '#.storybook/preview';
import { useState } from 'react';

import Target from '../components/Target';

const meta = preview.meta({
    component: Target,
    title: 'Fields/Target',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Target isForm value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
