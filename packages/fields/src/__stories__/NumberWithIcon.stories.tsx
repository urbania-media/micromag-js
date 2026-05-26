import preview from '#.storybook/preview';
import { faRuler } from '@fortawesome/free-solid-svg-icons/faRuler';
import { useState } from 'react';

import NumberWithIcon from '../components/NumberWithIcon';

const meta = preview.meta({
    component: NumberWithIcon,
    title: 'Fields/NumberWithIcon',
});

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <NumberWithIcon icon={faRuler} value={value} onChange={setValue} {...props} />
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
