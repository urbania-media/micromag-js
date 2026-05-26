import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import VisualsWithCaption from '../components/VisualsWithCaption';

const meta = preview.meta({
    component: VisualsWithCaption,
    title: 'Fields/VisualsWithCaption',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState([]);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <VisualsWithCaption value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
