import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import ToggleFields from '../components/ToggleFields';
import callToActionField from '../fields/call-to-action';

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

// Reproduces the editor, where the story parser adds the theme styles to the value
// even when it is null (see issue #21)
const withThemeStyles = (value) => ({
    ...value,
    label: {
        ...value?.label,
        textStyle: value?.label?.textStyle ?? { fontSize: 20, color: { color: '#FFFFFF' } },
    },
    boxStyle: value?.boxStyle ?? { backgroundColor: { color: '#0000FF' } },
});

const ThemedFieldContainer = () => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <ToggleFields
                    value={withThemeStyles(value)}
                    onChange={setValue}
                    fields={callToActionField.fields}
                    toggleLabel={callToActionField.toggleLabel}
                />
            </FieldsProvider>
            <pre className="mt-4">{JSON.stringify(value, null, 2)}</pre>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
export const callToActionWithTheme = meta.story(() => <ThemedFieldContainer />);
