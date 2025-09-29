/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    color, // headerFooter,
    sortItems,
    title,
    transitions,
} from '../../../../.storybook/data';
import GameSortScreen from '../GameSort';
import definition from '../definition';

const props = {
    heading: title(),
    items: sortItems() || null,
    shareUrl: null,
    options: {
        email: true,
        facebook: true,
        twitter: true,
        linkedin: true,
    },
    background: backgroundColor(),
    transitions: transitions(),
    buttonsStyle: {
        // border: '1px solid #000',
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: '1',
    },
};

export default {
    title: 'Screens/GameSort',
    component: GameSortScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

const styles = {
    buttonsStyle: {
        backgroundColor: color(),
        borderRadius: '10px',
    },
    buttonsTextStyle: {
        // fontSize: '20px',
    },
};

export const Placeholder = (storyProps) => <GameSortScreen {...storyProps} />;

export const Preview = (storyProps) => <GameSortScreen {...storyProps} {...props} />;

export const Static = (storyProps) => <GameSortScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <GameSortScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GameSortScreen {...storyProps} />;

export const Normal = (storyProps) => <GameSortScreen {...storyProps} {...props} {...styles} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
