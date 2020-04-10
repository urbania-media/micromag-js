import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import {
    Top,
    TopReverse,
    Center,
    CenterReverse,
    Bottom,
    BottomReverse,
    Side,
    SideReverse,
} from '../components';

export default {
    component: Top,
    title: 'Screens/TextImage/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTop = () => <Top renderFormat="placeholder" />;

export const PlaceholderTopReverse = () => <TopReverse renderFormat="placeholder" />;

export const PlaceholderCenter = () => <Center renderFormat="placeholder" />;

export const PlaceholderCenterReverse = () => <CenterReverse renderFormat="placeholder" />;

export const PlaceholderBottom = () => <Bottom renderFormat="placeholder" />;

export const PlaceholderBottomReverse = () => <BottomReverse renderFormat="placeholder" />;

export const PlaceholderSide = () => <Side renderFormat="placeholder" />;

export const PlaceholderSideReverse = () => <SideReverse renderFormat="placeholder" />;
