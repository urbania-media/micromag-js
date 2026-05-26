import preview from '#.storybook/preview';
import { useState } from 'react';

import TrueFalse from '../components/TrueFalse';

const meta = preview.meta({
    component: TrueFalse,
    title: 'Fields/TrueFalse',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <TrueFalse value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
