/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { image, text, background } from '../../../../.storybook/data';

import Slideshow from '../Slideshow';

const layouts = ['center'];

const props = {
    background: background(),
    items: [
        {
            image: image({ width: 500, height: 250 }),
            text: text(),
        },
        {
            image: image({ width: 500, height: 400 }),
            text: text(),
        },
        {
            image: image({ width: 500, height: 500 }),
            text: text(),
        },
    ],
};

const switcherProps = {
    layouts,
    defaultLayout: 'center',
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    title: 'Screens/Slideshow',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {(layout) => (
            <PlaceholderScreen>
                <Slideshow layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <PreviewScreen>
                <Slideshow layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Slideshow layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Slideshow
                    layout={layout}
                    textAlign={select('textAlign', options, 'center')}
                    {...props}
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
