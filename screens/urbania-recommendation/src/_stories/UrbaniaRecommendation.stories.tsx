/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundVideo, headerFooter, imageMedia, videoMedia } from '#.storybook/data';
import urbaniaReco from '#.storybook/data/stories/urbania-reco';
import preview from '#.storybook/preview';
import React from 'react';

import UrbaniaRecommendation from '../UrbaniaRecommendation';
import definition from '../definition';

const props = {
    ...urbaniaReco,
};

const video = { image: videoMedia() };

const meta = preview.meta({
    title: 'Urbania Screens/UrbaniaRecommendation',
    component: UrbaniaRecommendation,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaRecommendation),
    },
});

export const Placeholder = meta.story((args) => <UrbaniaRecommendation {...args} />);

export const Preview = meta.story((args) => <UrbaniaRecommendation {...args} {...props} />);

export const Static = meta.story((args) => <UrbaniaRecommendation {...args} {...props} />);

export const Capture = meta.story((args) => <UrbaniaRecommendation {...args} {...props} />);

export const Edit = meta.story((args) => <UrbaniaRecommendation {...args} />);

export const Normal = meta.story((args) => (
    <UrbaniaRecommendation
        {...args}
        {...props}
        // layout="bottom"
        visual={{ image: imageMedia({ width: 1309, height: 1223 }) }}
    />
));

export const NoCategory = meta.story((args) => (
    <UrbaniaRecommendation
        {...args}
        {...props}
        // layout="bottom"
        visual={{ image: imageMedia({ width: 1309, height: 1223 }) }}
        category={null}
    />
));

export const VisualBottom = meta.story((args) => (
    <UrbaniaRecommendation
        {...args}
        {...props}
        layout="top"
        sponsor
        visual={{ image: imageMedia({ width: 1009, height: 623 }) }}
    />
));

export const WithVideoVisual = meta.story((args) => (
    <UrbaniaRecommendation {...args} {...props} visual={video} />
));

export const WithoutVisual = meta.story((args) => (
    <UrbaniaRecommendation {...args} {...props} visual={null} layout="top" />
));

export const WithVideoBackground = meta.story((args) => (
    <UrbaniaRecommendation {...args} {...props} background={backgroundVideo()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <UrbaniaRecommendation {...args} {...props} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
