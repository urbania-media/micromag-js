/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import horoscope from '../../../../.storybook/data/stories/urbania-horoscope';
import UrbaniaHoroscope from '../UrbaniaHoroscope';
import definition from '../definition';

const props = {
    ...horoscope,
};

export default {
    title: 'Urbania Screens/UrbaniaHoroscope',
    component: UrbaniaHoroscope,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaHoroscope),
    },
};

export const Placeholder = (storyProps) => <UrbaniaHoroscope {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Static = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Capture = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Edit = (storyProps) => <UrbaniaHoroscope {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaHoroscope {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
