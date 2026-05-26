import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import ElementList from '../components/ElementList';

const meta = preview.meta({
    component: ElementList,
    title: 'Fields/ElementList',

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
                <ElementList value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
