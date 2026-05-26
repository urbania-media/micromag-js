import preview from '#.storybook/preview';

import TextModal from '../components/TextModal';
import FieldContainer from './FieldContainer';

const meta = preview.meta({
    component: TextModal,
    title: 'Fields/TextModal',

    parameters: {
        intl: true,
    },
});

export const normal = meta.story(() => (
    <FieldContainer>
        <TextModal />
    </FieldContainer>
));
export const disabled = meta.story(() => (
    <FieldContainer>
        <TextModal disabled />
    </FieldContainer>
));
