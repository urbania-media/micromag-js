import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import ImagesWithCaption from '../components/ImagesWithCaption';

const meta = preview.meta({
    component: ImagesWithCaption,
    title: 'Fields/ImagesWithCaption',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState([]);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <ImagesWithCaption value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
