import preview from '#.storybook/preview';
import { useState } from 'react';

import FieldsProvider from '../FieldsProvider';
import Answers from '../components/Answers';

const meta = preview.meta({
    component: Answers,
    title: 'Fields/Answers',

    parameters: {
        intl: true,
    },
});

const FieldContainer = (props) => {
    const [value, setValue] = useState([]);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <Answers value={value} onChange={setValue} {...props} />
            </FieldsProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
