import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import ToggleSection from '../components/ToggleSection';

const meta = preview.meta({
    component: ToggleSection,
    title: 'Fields/ToggleSection',

    parameters: {
        intl: true,
    },
});

const fields = [
    { name: 'enabled', type: 'toggle', label: 'Enabled' },
    { name: 'label', type: 'text', label: 'Label' },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <ToggleSection value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
