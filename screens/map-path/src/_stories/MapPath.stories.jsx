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
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';

import MapPath, { layouts } from '../MapPath';

const props = {
    map: map(),
    markers: markers(),
    cardBackground: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'top',
};

export default {
    title: 'Screens/MapPath',
    decorators: [withGoogleMaps],
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
                <MapPath layout={layout} renderFormat="edit" {...props} />
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
