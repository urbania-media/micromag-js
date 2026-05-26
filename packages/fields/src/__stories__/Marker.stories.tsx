import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Marker from '../components/Marker';

const meta = preview.meta({
    component: Marker,
    title: 'Fields/Marker',

    parameters: {
        intl: true,
    },
});

const fields = [{ name: 'title', type: 'text', label: 'Title' }];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Marker value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
