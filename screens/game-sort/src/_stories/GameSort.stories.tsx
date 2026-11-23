/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    color, // headerFooter,
    sortItems,
    title,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

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

const meta = preview.meta({
    title: 'Screens/GameSort',
    component: GameSortScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

const styles = {
    buttonsStyle: {
        backgroundColor: color(),
        borderRadius: '10px',
    },
    buttonsTextStyle: {
        // fontSize: '20px',
    },
};

export const Placeholder = meta.story((args) => <GameSortScreen {...args} />);

export const Preview = meta.story((args) => <GameSortScreen {...args} {...props} />);

export const Static = meta.story((args) => <GameSortScreen {...args} {...props} />);

export const Capture = meta.story((args) => <GameSortScreen {...args} {...props} />);

export const Edit = meta.story((args) => <GameSortScreen {...args} />);

export const Normal = meta.story((args) => <GameSortScreen {...args} {...props} {...styles} />);

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
