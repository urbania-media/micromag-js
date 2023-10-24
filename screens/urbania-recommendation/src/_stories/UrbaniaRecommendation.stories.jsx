/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundVideo, imageMedia, headerFooter, videoMedia } from '../../../../.storybook/data';
import urbaniaReco from '../../../../.storybook/data/stories/urbania-reco';
import UrbaniaRecommendation from '../UrbaniaRecommendation';
import definition from '../definition';

const props = {
    ...urbaniaReco,
};

const video = { image: videoMedia() };

export default {
    title: 'Urbania Screens/UrbaniaRecommendation',
    component: UrbaniaRecommendation,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaRecommendation),
    },
};

export const Placeholder = (storyProps) => <UrbaniaRecommendation {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;

export const Static = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;

export const Capture = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;

export const Edit = (storyProps) => <UrbaniaRecommendation {...storyProps} />;

export const Normal = (storyProps) => (
    <UrbaniaRecommendation
        {...storyProps}
        {...props}
        // layout="bottom"
        visual={{ image: imageMedia({ width: 1309, height: 1223 }) }}
    />
);

export const VisualBottom = (storyProps) => (
    <UrbaniaRecommendation
        {...storyProps}
        {...props}
        layout="top"
        sponsor
        visual={{ image: imageMedia({ width: 1009, height: 623 }) }}
    />
);

export const WithVideoVisual = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} visual={video} />
);

export const WithoutVisual = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} visual={null} layout="top" />
);

export const WithVideoBackground = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} background={backgroundVideo()} />
);

export const WithHeaderFooter = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
