/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { images, background } from '../../../../.storybook/data';

import GalleryScroll, { layouts } from '../GalleryScroll';

const props = {
    images: images({ width: 500, height: Math.random() > 0.5 ? 300 : 200, count: 20 }),
    background: background(),
};

const smallProps = {
    images: images({ width: 150, height: 100, count: 20 }),
    background: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'single',
};

export default {
    title: 'Screens/GalleryScroll',
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {(layout) => (
            <PlaceholderScreen>
                <GalleryScroll layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <PreviewScreen>
                <GalleryScroll layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <GalleryScroll layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <GalleryScroll layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Small = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <GalleryScroll layout={layout} {...smallProps} />
            </Screen>
        )}
    </LayoutSwitcher>
);
