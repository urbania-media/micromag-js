import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Element from '../components/Element';

const meta = preview.meta({
    component: Element,
    title: 'Fields/Element',

    parameters: {
        intl: true,
    },
});

const fields = [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'body', type: 'textarea', label: 'Body' },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Element value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
