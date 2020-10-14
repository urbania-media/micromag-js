/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    PlaceholderScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';

import SurveyCheckbox, { layouts } from '../SurveyCheckbox';

export default {
    // component: Main,
    title: 'Screens/SurveyCheckbox',
};

const props = {
    question: { body: 'Voici une question à répondre' },
    options: [
        { body: 'La première réponse' },
        { body: 'La deuxième réponse' },
        { body: 'La troixième réponse' },
    ],
    result: {
        image: { url: 'https://picsum.photos/400/300' },
        text: { body: 'Le résultat de votre quiz' },
    },
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {(layout) => (
            <PlaceholderScreen>
                <SurveyCheckbox layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Editor = () => (
    <LayoutSwitcher layouts={layouts}>
        {(layout) => (
            <Screen>
                <SurveyCheckbox layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {(layout) => (
            <Screen>
                <SurveyCheckbox layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
