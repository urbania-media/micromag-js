import React, { useState } from 'react';
import GeoPosition from '../components/GeoPosition';
import withGoogleMapsApi from '../../../../.storybook/decorators/withGoogleMaps';

export default {
    component: GeoPosition,
    title: 'Fields/GeoPosition',
    decorators: [withGoogleMapsApi],
    parameters: {
        intl: true,
    },
};

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <GeoPosition value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <FieldContainer />
    </div>
);
