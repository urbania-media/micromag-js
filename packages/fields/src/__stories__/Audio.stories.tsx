import preview from '#.storybook/preview';

import Audio from '../components/Audio';
import FieldContainer from './FieldContainer';

const meta = preview.meta({
    component: Audio,
    title: 'Fields/Audio',

    parameters: {
        intl: true,
    },
});

export const normal = meta.story(() => (
    <FieldContainer>
        <Audio />
    </FieldContainer>
));
export const disabled = meta.story(() => (
    <FieldContainer>
        <Audio disabled />
    </FieldContainer>
));
