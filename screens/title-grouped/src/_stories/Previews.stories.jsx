import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import { TitleGroupedTop } from '../components';

export default {
    component: TitleGroupedTop,
    title: 'Screens/TitleGrouped/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTitleGroupedTop = () => <TitleGroupedTop renderFormat="preview" />;

// export const PreviewOneOneSplitReverse = () => <OneOneSplitReverse renderFormat="preview" />;
//
// export const PreviewThreeOneSplit = () => <ThreeOneSplit renderFormat="preview" />;
//
// export const PreviewThreeSplit = () => <ThreeSplit renderFormat="preview" />;
//
// export const PreviewTwoOneSplit = () => <TwoOneSplit renderFormat="preview" />;
