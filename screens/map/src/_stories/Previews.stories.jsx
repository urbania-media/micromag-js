import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import { Center } from '../components';

export default {
    component: Center,
    title: 'Screens/Map/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center renderFormat="preview" />;
