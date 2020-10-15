/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { videoFile, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Video from '../Video';
import definition from '../definition';

const props = {
    video: { video: videoFile() },
    background: background(),
};

const propsWithControls = {
    ...props,
    video: { video: videoFile(), params: { controls: true, muted: true, autoPlay: true } },
};

export default {
    title: 'Screens/Video',
    component: Video,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Video),
    },
};

export const Placeholder = (storyProps) => <Video {...storyProps} />;

export const Preview = (storyProps) => <Video {...storyProps} />;

export const Edit = (storyProps) => <Video {...storyProps} />;

export const Normal = (storyProps) => <Video {...storyProps} {...props} />;

export const WithControls = (storyProps) => <Video {...storyProps} {...propsWithControls} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
