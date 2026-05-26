import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import BoxStyleForm from '../components/BoxStyleForm';

const meta = preview.meta({
    component: BoxStyleForm,
    title: 'Fields/BoxStyleForm',

    parameters: {
        intl: true,
    },
});

const fields = [{ name: 'padding', type: 'spacing', label: 'Padding' }];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <BoxStyleForm value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
