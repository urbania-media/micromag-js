import preview from '#.storybook/preview';
import { useState } from 'react';

import Video from '../components/Video';

const meta = preview.meta({
    component: Video,
    title: 'Fields/Video',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Video value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
