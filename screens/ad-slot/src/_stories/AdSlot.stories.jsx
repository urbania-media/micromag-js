/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { background } from '../../../../.storybook/data';

import AdSlot from '../AdSlot';
import layouts from '../layouts/names';

const props = {
    iframe: {
        url: null,
    },
    background: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'center',
};

export default {
    title: 'Screens/AdSlot',
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <AdSlot layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <AdSlot layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <AdSlot layout={layout} renderFormat="edit" />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <AdSlot layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
