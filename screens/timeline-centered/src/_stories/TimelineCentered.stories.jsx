/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';

import {
    PlaceholderScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { description, subtitle, image, title } from '../../../../.storybook/data';

import TimelineCentered, { layouts } from '../TimelineCentered';

export default {
    // component: Normal,
    title: 'Screens/TimelineCentered',
    decorators: [withKnobs, withScreenSize()],
};

const props = {
    items: [
        { title: {body: title()}, subtitle: { body: subtitle() }, text: { body: description() } },
        { subtitle: { body: subtitle() }, text: { body: description() }, image: image() },
        { title: {body: title()}, subtitle: { body: subtitle() }, text: { body: description() } },
        { title: {body: title()}, subtitle: { body: subtitle() }, text: { body: description() }, image: image() },
    ],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {(layout) => (
            <PlaceholderScreen>
                <TimelineCentered layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Editor = () => (
    <LayoutSwitcher layouts={layouts}>
        {(layout) => (
            <Screen>
                <TimelineCentered layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {(layout) => (
            <Screen>
                <TimelineCentered layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
