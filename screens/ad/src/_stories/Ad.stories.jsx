/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { advertising, image, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import AdScreen from '../Ad';
import definition from '../definition';

const props = {
    ...advertising({ width: 300, height: 100 }),
    background: background(),
};

export default {
    title: 'Screens/Ad (TODO)',
    component: AdScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <AdScreen {...storyProps} />;

export const Preview = (storyProps) => <AdScreen {...storyProps} />;

export const Edit = (storyProps) => <AdScreen {...storyProps} />;

export const Normal = (storyProps) => <AdScreen {...storyProps} {...props} />;
export const MediumRectangle = (storyProps) => (
    <AdScreen {...storyProps} {...props} image={image({ width: 300, height: 250 })} />
);
export const LargeRectangle = (storyProps) => (
    <AdScreen {...storyProps} {...props} image={image({ width: 336, height: 280 })} />
);
export const Skyscraper = (storyProps) => (
    <AdScreen {...storyProps} {...props} image={image({ width: 300, height: 600 })} />
);
export const MobilePortrait = (storyProps) => (
    <AdScreen {...storyProps} {...props} image={image({ width: 320, height: 480 })} />
);
export const WithSpacing = (storyProps) => (
    <AdScreen {...storyProps} {...props} image={image({ width: 320, height: 480 })} spacing={20} />
);

export const Definition = () => <ScreenDefinition definition={definition} />;
