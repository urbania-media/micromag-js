import preview from '#.storybook/preview';
import { useState } from 'react';

import MediaThumbnail from '../components/MediaThumbnail';

const meta = preview.meta({
    component: MediaThumbnail,
    title: 'Fields/MediaThumbnail',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <MediaThumbnail value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
