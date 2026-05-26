import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Question from '../components/Question';

const meta = preview.meta({
    component: Question,
    title: 'Fields/Question',

    parameters: {
        intl: true,
    },
});

const fields = [
    { name: 'question', type: 'text', label: 'Question' },
    { name: 'answer', type: 'text', label: 'Answer' },
];

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Question value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
