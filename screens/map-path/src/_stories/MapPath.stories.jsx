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

import MapPath from '../MapPath';

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
    title: 'Screens/MapPath',
    decorators: [withGoogleMapsApi],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <MapPath layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <MapPath layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <PreviewScreen layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <MapPath layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
