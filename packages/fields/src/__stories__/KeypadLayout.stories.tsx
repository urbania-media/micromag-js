import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import KeypadLayout from '../components/KeypadLayout';

const meta = preview.meta({
    component: KeypadLayout,
    title: 'Fields/KeypadLayout',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <KeypadLayout value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
