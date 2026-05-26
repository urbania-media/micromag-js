import preview from '#.storybook/preview';
import { useState } from 'react';

import CardLayout from '../components/CardLayout';

const meta = preview.meta({
    component: CardLayout,
    title: 'Fields/CardLayout',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <CardLayout value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
