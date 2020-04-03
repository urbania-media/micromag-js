import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import { Top, Center, Bottom } from '../components';

export default {
    component: Top,
    title: 'Screens/Text/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top renderFormat="preview" />;

export const PreviewCenter = () => <Center renderFormat="preview" />;

export const PreviewBottom = () => <Bottom renderFormat="preview" />;
