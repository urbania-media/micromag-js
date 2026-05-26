import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Map from '../components/Map';

const meta = preview.meta({
    component: Map,
    title: 'Fields/Map',

    parameters: {
        intl: true,
    },
});

const fields = [
    { name: 'zoom', type: 'number', label: 'Zoom' },
    { name: 'center', type: 'geo-position', label: 'Center' },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Map value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
