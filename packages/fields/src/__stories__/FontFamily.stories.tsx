import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import FontFamily from '../components/FontFamily';

const meta = preview.meta({
    component: FontFamily,
    title: 'Fields/FontFamily',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <FontFamily value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
