import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import ToggleFields from '../components/ToggleFields';

const meta = preview.meta({
    component: ToggleFields,
    title: 'Fields/ToggleFields',

    parameters: {
        intl: true,
    },
});

const fields = [{ name: 'label', type: 'text', label: 'Label' }];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <ToggleFields
                    value={value}
                    onChange={setValue}
                    fields={fields}
                    toggleLabel="Enable"
                    {...props}
                />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
