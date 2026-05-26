import preview from '#.storybook/preview';
import { useState } from 'react';

import Image from '../components/Image';

const meta = preview.meta({
    component: Image,
    title: 'Fields/Image',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Image value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
