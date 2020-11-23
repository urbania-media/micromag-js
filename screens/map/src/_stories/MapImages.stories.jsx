/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { map, markers, background } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import MapImagesScreen from '../MapImages';
import definition from '../definition';

const props = {
    map: map(),
    markers: markers({ withImage: true }),
    splash: { body: 'Débuter' },
    background: background()
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

export const Edit = (storyProps) => <MapImagesScreen {...storyProps} />;

export const Normal = (storyProps) => <MapImagesScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;