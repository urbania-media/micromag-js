/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { description, subtitle, image, title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TimelineCentered from '../TimelineCentered';
import definition, { layouts } from '../definition';

const props = {
    items: [
        { title: {body: title()}, subtitle: { body: subtitle() }, text: { body: description() } },
        { subtitle: { body: subtitle() }, text: { body: description() }, image: image() },
        { title: {body: title()}, subtitle: { body: subtitle() }, text: { body: description() } },
        { title: {body: title()}, subtitle: { body: subtitle() }, text: { body: description() }, image: image() },
    ],
};

export default {
    title: 'Screens/TimelineCentered',
    component: TimelineCentered,
    parameters: {
        intl: true,
        screenLayouts: layouts
    }
};

export const Placeholder = (storyProps) => <TimelineCentered {...storyProps} />;

export const Preview = (storyProps) => <TimelineCentered {...storyProps} />;

export const Edit = (storyProps) => <TimelineCentered {...storyProps} />;

export const Normal = (storyProps) => <TimelineCentered {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;