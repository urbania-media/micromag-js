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
import { title } from '../../../../.storybook/data';

import layouts from '../layouts/names';
import TimelineDots from '../TimelineDots';

export default {
    component: Text,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs, withScreenSize()],
};

const props = {
  title: { body: title() }
}

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <TimelineDots layout={layout}  renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <TimelineDots layout={layout} {...props}/>
            </Screen>
        )}
    </LayoutSwitcher>
);
