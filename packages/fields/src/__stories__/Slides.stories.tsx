import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Slides from '../components/Slides';

const meta = preview.meta({
    component: Slides,
    title: 'Fields/Slides',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState([]);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Slides value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
