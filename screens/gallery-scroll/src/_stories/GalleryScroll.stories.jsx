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

import GalleryScroll from '../GalleryScroll';
import layouts from '../layouts/names';

const props = {
    images: images({ width: 500, height: 300, count: 20 }),
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
        {layout => (
            <PlaceholderScreen>
                <GalleryScroll layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <GalleryScroll layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <GalleryScroll layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <GalleryScroll layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
