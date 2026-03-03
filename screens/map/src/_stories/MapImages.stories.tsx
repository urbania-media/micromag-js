/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, markers, text, title, transitions } from '#.storybook/data';
import withGoogleMaps from '#.storybook/decorators/withGoogleMaps';
import preview from '#.storybook/preview';
import React from 'react';

import MapImagesScreen from '../MapImages';
import definition from '../definition';

const props = {
    title: { body: title() },
    description: text(),
    button: { body: 'Débuter' },
    draggable: true,
    markers: markers({ withImage: true }),
    background: backgroundColor(),
    transitions: transitions(),
};

const meta = preview.meta({
    title: 'Screens/MapImages',
    decorators: [withGoogleMaps],
    component: MapImagesScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === MapImagesScreen),
    },
});

export const Placeholder = meta.story((args) => <MapImagesScreen {...args} />);

export const Preview = meta.story((args) => <MapImagesScreen {...args} {...props} />);
export const Static = meta.story((args) => <MapImagesScreen {...args} {...props} />);
export const Capture = meta.story((args) => <MapImagesScreen {...args} {...props} />);

export const Edit = meta.story((args) => <MapImagesScreen {...args} />);

export const Normal = meta.story((args) => <MapImagesScreen {...args} {...props} />);

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
