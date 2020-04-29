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
import { description, subtitle } from '../../../../.storybook/data';

import layouts from '../layouts/names';
import TimelineCentered from '../TimelineCentered';

export default {
    // component: Normal,
    title: 'Screens/TimelineCentered',
    decorators: [withKnobs, withScreenSize()],
};

const props = {
    items: [
        { subtitle: { body: subtitle() }, text: { body: description() } },
        { subtitle: { body: subtitle() }, text: { body: description() } },
        { subtitle: { body: subtitle() }, text: { body: description() } },
    ],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <TimelineCentered layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Editor = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <TimelineCentered layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <TimelineCentered layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
