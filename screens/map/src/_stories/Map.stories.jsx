/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { map, markers, background } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Map from '../Map';
import definition from '../definition';

const props = {
    map: map(),
    markers: markers(),
    splash: { body: 'Débuter' },
    background: background(),
};

export default {
    title: 'Screens/Map',
    decorators: [withGoogleMaps],
    component: Map,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Map),
    },
};

export const Placeholder = (storyProps) => <Map {...storyProps} />;

export const Preview = (storyProps) => <Map {...storyProps} {...props} />;

export const Edit = (storyProps) => <Map {...storyProps} />;

export const Normal = (storyProps) => <Map {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;