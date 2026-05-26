import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Padding from '../components/Padding';

const meta = preview.meta({
    component: Padding,
    title: 'Fields/Padding',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Padding value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const isForm = meta.story(() => <FieldContainer isForm />);
export const disabled = meta.story(() => <FieldContainer disabled />);
