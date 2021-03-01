/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { title, text, markers, backgroundColor, transitions } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
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

export default {
    title: 'Screens/MapImages',
    decorators: [withGoogleMaps],
    component: MapImagesScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === MapImagesScreen),
    },
};

export const Placeholder = (storyProps) => <MapImagesScreen {...storyProps} />;

export const Preview = (storyProps) => <MapImagesScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <MapImagesScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <MapImagesScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <MapImagesScreen {...storyProps} />;

export const Normal = (storyProps) => <MapImagesScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
