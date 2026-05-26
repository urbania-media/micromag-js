import preview from '#.storybook/preview';

import ClosedCaptions from '../components/ClosedCaptions';
import FieldContainer from './FieldContainer';

const meta = preview.meta({
    component: ClosedCaptions,
    title: 'Fields/ClosedCaptions',

    parameters: {
        intl: true,
    },
});

export const normal = meta.story(() => (
    <FieldContainer>
        <ClosedCaptions />
    </FieldContainer>
));
export const disabled = meta.story(() => (
    <FieldContainer>
        <ClosedCaptions disabled />
    </FieldContainer>
));
