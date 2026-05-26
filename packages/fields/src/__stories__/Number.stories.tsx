import preview from '#.storybook/preview';
import { useState } from 'react';

import Number from '../components/Number';

const meta = preview.meta({
    component: Number,
    title: 'Fields/Number',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <Number value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const withDataList = meta.story(() => (
    <FieldContainer disabled dataList={[1, 2, 3, 4, 5]} />
));
export const disabled = meta.story(() => <FieldContainer disabled />);
