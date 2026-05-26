import preview from '#.storybook/preview';
import { useState } from 'react';

import Media from '../components/Media';

const meta = preview.meta({
    component: Media,
    title: 'Fields/Media',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Media value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
