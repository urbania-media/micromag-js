/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { advertising, image, background } from '../../../../.storybook/data';

import Ad from '../Ad';
import layouts from '../layouts/names';

const props = {
    ...advertising({ width: 300, height: 250 }),
    background: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'center',
};

export default {
    title: 'Screens/Ad',
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {(layout) => (
            <PlaceholderScreen>
                <Ad layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <PreviewScreen>
                <Ad layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <PreviewScreen>
                <Ad layout={layout} renderFormat="edit" />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Ad layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const MediumRectangle = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Ad layout={layout} {...props} image={image({ width: 300, height: 250 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const LargeRectangle = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Ad layout={layout} {...props} image={image({ width: 336, height: 280 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Skyscraper = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Ad layout={layout} {...props} image={image({ width: 300, height: 600 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const MobilePortrait = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Ad layout={layout} {...props} image={image({ width: 320, height: 480 })} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const WithSpacing = () => (
    <LayoutSwitcher {...switcherProps}>
        {(layout) => (
            <Screen>
                <Ad
                    layout={layout}
                    {...props}
                    spacing={20}
                    image={image({ width: 320, height: 480 })}
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
