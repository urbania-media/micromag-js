import preview from '#.storybook/preview';
import { useState } from 'react';

import FontStyleWithAlign from '../components/FontStyleWithAlign';

const meta = preview.meta({
    component: FontStyleWithAlign,
    title: 'Fields/FontStyleWithAlign',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FontStyleWithAlign value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
