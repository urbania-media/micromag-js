/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { map, background } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    map: map(),
    background: background(),
};

export default {
    component: Center,
    title: 'Screens/MapPath/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;
