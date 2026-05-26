import preview from '#.storybook/preview';
import { useState } from 'react';

import FontStyle from '../components/FontStyle';

const meta = preview.meta({
    component: FontStyle,
    title: 'Fields/FontStyle',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FontStyle value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
