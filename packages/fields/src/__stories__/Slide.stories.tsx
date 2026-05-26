import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Slide from '../components/Slide';

const meta = preview.meta({
    component: Slide,
    title: 'Fields/Slide',

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
                <Slide value={value} onChange={setValue} fields={fields} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
