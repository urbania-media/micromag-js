/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import {
    PlaceholderScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { title, description, subtitle } from '../../../../.storybook/data';

import layouts from '../layouts/names';
import TimelineDots from '../TimelineDots';

export default {
    // component: Normal,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs],
};

const props = {
    title: {
        body: title(),
    },
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
                <TimelineDots layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <TimelineDots layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
