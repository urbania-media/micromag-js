/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { map, background, markers } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import MapPath from '../MapPath';
import definition from '../definition';

const props = {
    map: map(),
    markers: markers(),
    cardBackground: background(),
};

export default {
    title: 'Screens/MapPath',
    decorators: [withGoogleMaps],
    component: MapPath,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <MapPath {...storyProps} />;

export const Preview = (storyProps) => <MapPath {...storyProps} />;

export const Edit = (storyProps) => <MapPath {...storyProps} />;

export const Normal = (storyProps) => <MapPath {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
