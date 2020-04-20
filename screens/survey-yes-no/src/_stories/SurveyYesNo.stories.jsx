/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { description } from '../../../../.storybook/data';

import {
    PlaceholderScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';

import layouts from '../layouts/names';
import SurveyYesNo from '../SurveyYesNo';

export default {
    // component: Normal,
    title: 'Screens/SurveyYesNo',
    decorators: [withKnobs, withScreenSize()],
};

const props = {
    question: { body: description() },
    result: {
        image: { url: 'https://picsum.photos/400/300' },
        text: { body: 'Le résultat de votre quiz' },
    },
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
                <SurveyYesNo layout={layout} {...props}/>
            </Screen>
        )}
    </LayoutSwitcher>
);
