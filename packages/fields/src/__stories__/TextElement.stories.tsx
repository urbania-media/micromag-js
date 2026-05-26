import preview from '#.storybook/preview';
import { useState } from 'react';

import TextElement from '../components/TextElement';

const meta = preview.meta({
    component: TextElement,
    title: 'Fields/TextElement',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <TextElement value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
