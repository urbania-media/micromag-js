import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Answer from '../components/Answer';

const meta = preview.meta({
    component: Answer,
    title: 'Fields/Answer',

    parameters: {
        intl: true,
    },
});

const fields = [{ name: 'text', type: 'text', label: 'Text' }];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Answer value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const form = meta.story(() => <FieldContainer isForm />);
export const disabled = meta.story(() => <FieldContainer isForm disabled />);
