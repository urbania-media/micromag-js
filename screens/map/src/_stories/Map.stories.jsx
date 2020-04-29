/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { map, background } from '../../../../.storybook/data';
import { withGoogleMapsApi } from '../../../../.storybook/decorators';

import MapScreen from '../Map';

import layouts from '../layouts/names';

const props = {
    map: map(),
    cardBackground: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'bottom',
};

export default {
    title: 'Screens/Map',
    decorators: [withGoogleMapsApi],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <MapScreen layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <MapScreen layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <MapScreen layout={layout} renderFormat="edit" {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <MapScreen layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
