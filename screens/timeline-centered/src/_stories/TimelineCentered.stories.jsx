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

import layouts from '../layouts/names';
import TimelineCentered from '../TimelineCentered';

export default {
    component: Text,
    title: 'Screens/TimelineCentered',
    decorators: [withKnobs, withScreenSize()],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <TimelineCentered layout={layout}  renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <TimelineCentered layout={layout} />
            </Screen>
        )}
    </LayoutSwitcher>
);
