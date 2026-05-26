import preview from '#.storybook/preview';
import { useState } from 'react';

import Alignment from '../components/Alignment';

const meta = preview.meta({
    component: Alignment,
    title: 'Fields/Alignment',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Alignment value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
