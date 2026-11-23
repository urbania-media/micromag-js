/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import horoscope from '#.storybook/data/stories/urbania-horoscope';
import preview from '#.storybook/preview';
import React from 'react';

import UrbaniaHoroscope from '../UrbaniaHoroscope';
import definition from '../definition';

const props = {
    ...horoscope,
};

const meta = preview.meta({
    title: 'Urbania Screens/UrbaniaHoroscope',
    component: UrbaniaHoroscope,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaHoroscope),
    },
});

export const Placeholder = meta.story((args) => <UrbaniaHoroscope {...args} />);

export const Preview = meta.story((args) => <UrbaniaHoroscope {...args} {...props} />);

export const Static = meta.story((args) => <UrbaniaHoroscope {...args} {...props} />);

export const Capture = meta.story((args) => <UrbaniaHoroscope {...args} {...props} />);

export const Edit = meta.story((args) => <UrbaniaHoroscope {...args} />);

export const Normal = meta.story((args) => <UrbaniaHoroscope {...args} {...props} />);

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
