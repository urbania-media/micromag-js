import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Markers from '../components/Markers';

const meta = preview.meta({
    component: Markers,
    title: 'Fields/Markers',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState([]);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Markers value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
