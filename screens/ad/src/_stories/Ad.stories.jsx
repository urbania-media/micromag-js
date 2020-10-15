/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { advertising, image, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Ad from '../Ad';
import definition from '../definition';

const props = {
    ...advertising({ width: 300, height: 100 }),
    background: background(),
};

export default {
    title: 'Screens/Ad',
    component: Ad,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Ad {...storyProps} />;

export const Preview = (storyProps) => <Ad {...storyProps} />;

export const Edit = (storyProps) => <Ad {...storyProps} />;

export const Normal = (storyProps) => <Ad {...storyProps} {...props} />;
export const MediumRectangle = (storyProps) => (
    <Ad {...storyProps} {...props} image={image({ width: 300, height: 250 })} />
);
export const LargeRectangle = (storyProps) => (
    <Ad {...storyProps} {...props} image={image({ width: 336, height: 280 })} />
);
export const Skyscraper = (storyProps) => (
    <Ad {...storyProps} {...props} image={image({ width: 300, height: 600 })} />
);
export const MobilePortrait = (storyProps) => (
    <Ad {...storyProps} {...props} image={image({ width: 320, height: 480 })} />
);
export const WithSpacing = (storyProps) => (
    <Ad {...storyProps} {...props} image={image({ width: 320, height: 480 })} spacing={20} />
);

export const Definition = () => <ScreenDefinition definition={definition} />;
