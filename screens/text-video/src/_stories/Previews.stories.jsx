import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import { Top, Center, Bottom } from '../components';

export default {
    component: Top,
    title: 'Screens/TextVideo/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top isPreview />;

export const PreviewCenter = () => <Center isPreview />;

export const PreviewBottom = () => <Bottom isPreview />;

// export const PreviewTopCentered = () => <TopCentered isPreview />;
//
// export const PreviewBottomCentered = () => <BottomCentered isPreview />;
//
// export const PreviewSplit = () => <Split isPreview />;
