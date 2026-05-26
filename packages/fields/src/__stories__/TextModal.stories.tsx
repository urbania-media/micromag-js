import preview from '#.storybook/preview';
import { useState } from 'react';

import TextModal from '../components/TextModal';

const meta = preview.meta({
    component: TextModal,
    title: 'Fields/TextModal',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <TextModal value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
