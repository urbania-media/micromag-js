import preview from '#.storybook/preview';
import { useState } from 'react';

import { ScreenProvider } from '@micromag/core/contexts';

import ScreenLayout from '../components/ScreenLayout';

const meta = preview.meta({
    component: ScreenLayout,
    title: 'Fields/ScreenLayout',

    parameters: {
        intl: true,
    },
});

const definition = {
    id: 'text',
    layouts: ['top', 'middle', 'bottom'],
};

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <ScreenProvider definition={definition}>
                <ScreenLayout value={value} onChange={setValue} {...props} />
            </ScreenProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
