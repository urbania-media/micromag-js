/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    // text,
    // title,
    backgroundImage,
    transitions,
    callToAction,
} from '../../../../.storybook/data';
import Horoscope from '../Horoscope';
import definition from '../definition';

const props = {
    // category: { body: title() },
    // date: text('short'),
    // title: { body: title() },
    // sponsor: text('short'),
    // description: text('medium'),
    // category: { body: 'HOROSCOPE' },
    title: { body: 'Astrologie' },
    description: {
        body: 'Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac Zodiac ',
    },
    background: backgroundImage(),
    transitions: transitions(),
};

export default {
    title: 'Urbania Screens/Horoscope',
    component: Horoscope,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Horoscope),
    },
};

export const Placeholder = (storyProps) => <Horoscope {...storyProps} />;

export const Preview = (storyProps) => <Horoscope {...storyProps} {...props} />;
export const Static = (storyProps) => <Horoscope {...storyProps} {...props} />;
export const Capture = (storyProps) => <Horoscope {...storyProps} {...props} />;

export const Edit = (storyProps) => <Horoscope {...storyProps} />;

export const Normal = (storyProps) => <Horoscope {...storyProps} {...props} />;

export const WithCallToAction = (storyProps) => (
    <Horoscope {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
