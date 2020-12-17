/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { map, markers, backgroundColor, transitions } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import MapScreen from '../Map';
import definition from '../definition';

const props = {
    splash: { body: 'Débuter' },
    ...map(),
    markers: markers(),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Map',
    decorators: [withGoogleMaps],
    component: MapScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === MapScreen),
    },
};

export const Placeholder = (storyProps) => <MapScreen {...storyProps} />;

export const Preview = (storyProps) => <MapScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <MapScreen {...storyProps} />;

export const Normal = (storyProps) => <MapScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
