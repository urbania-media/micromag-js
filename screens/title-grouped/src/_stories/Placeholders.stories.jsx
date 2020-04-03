import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { TitleGroupedTop } from '../components';

export default {
    component: TitleGroupedTop,
    title: 'Screens/TitleGrouped/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTitleGroupedTop = () => <TitleGroupedTop renderFormat="placeholder" />;

// export const PlaceholderOneOneSplitReverse = () => (
//     <OneOneSplitReverse renderFormat="placeholder" />
// );
//
// export const PlaceholderThreeOneSplit = () => <ThreeOneSplit renderFormat="placeholder" />;
//
// export const PlaceholderThreeSplit = () => <ThreeSplit renderFormat="placeholder" />;
//
// export const PlaceholderTwoOneSplit = () => <TwoOneSplit renderFormat="placeholder" />;
