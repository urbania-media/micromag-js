/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { advertising, background } from '../../../../.storybook/data';

import AdSlot from '../AdSlot';
import layouts from '../layouts/names';

const props = {
    ad: advertising({ width: 300, height: 250 }),
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

export const MediumRectangle = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <AdSlot layout={layout} {...props} ad={advertising({ width: 300, height: 250 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const LargeRectangle = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <AdSlot layout={layout} {...props} ad={advertising({ width: 336, height: 280 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Skyscraper = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <AdSlot layout={layout} {...props} ad={advertising({ width: 300, height: 600 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const MobilePortrait = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <AdSlot layout={layout} {...props} ad={advertising({ width: 320, height: 480 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const FullScreen = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <AdSlot
                    layout={layout}
                    {...props}
                    ad={advertising({ width: 500, height: 700 })}
                    isFullScreen
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
