import withGoogleMapsApi from '#.storybook/decorators/withGoogleMaps';
import preview from '#.storybook/preview';
import React, { useState } from 'react';

import GeoPosition from '../components/GeoPosition';

const meta = preview.meta({
    component: GeoPosition,
    title: 'Fields/GeoPosition',
    decorators: [withGoogleMapsApi],

    parameters: {
        intl: true,
    },
});

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <GeoPosition value={value} onChange={setValue} />;
};

export const normal = meta.story(() => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
));
