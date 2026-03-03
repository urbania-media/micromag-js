/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, image360Media, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Image360Screen from '../Image360';
import definition from '../definition';

const props = () => ({
    image: image360Media(),
    background: backgroundColor(),
    transitions: transitions(),
});

const meta = preview.meta({
    title: 'Screens/Image 360',
    component: Image360Screen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <Image360Screen {...args} />);

export const Preview = meta.story((args) => <Image360Screen {...args} {...props()} />);

export const Static = meta.story((args) => <Image360Screen {...args} {...props()} />);

export const Capture = meta.story((args) => <Image360Screen {...args} {...props()} />);

export const Edit = meta.story((args) => <Image360Screen {...args} />);

export const Normal = meta.story((args) => <Image360Screen {...args} {...props()} />);

export const WithHeaderFooter = meta.story((args) => (
    <Image360Screen {...args} {...props()} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
