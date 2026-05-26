import preview from '#.storybook/preview';
import { useState } from 'react';

import AdFormat from '../components/AdFormat';

const meta = preview.meta({
    component: AdFormat,
    title: 'Fields/AdFormat',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <AdFormat value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
