/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { map, backgroundImage } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    map: map(),
};

export default {
    component: Center,
    title: 'Screens/Map/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewCenterWithBackground = () => (
    <Center {...props} background={backgroundImage()} renderFormat="preview" />
);
