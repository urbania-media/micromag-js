import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import ContainerStyle from '../components/ContainerStyle';

const meta = preview.meta({
    component: ContainerStyle,
    title: 'Fields/ContainerStyle',

    parameters: {
        intl: true,
    },
});

const fields = [
    { name: 'padding', type: 'spacing', label: 'Padding' },
    { name: 'margin', type: 'spacing', label: 'Margin' },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <ContainerStyle value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
