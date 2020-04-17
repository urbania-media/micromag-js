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
import SurveyYesNo from '../SurveyYesNo';

export default {
    // component: Main,
    title: 'Screens/SurveyYesNo',
    decorators: [withKnobs, withScreenSize()],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <SurveyYesNo layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <SurveyYesNo layout={layout} />
            </Screen>
        )}
    </LayoutSwitcher>
);
