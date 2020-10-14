/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { imageWithRandomSize, background } from '../../../../.storybook/data';

import Image, { layouts } from '../Image';

const props = {
    image: imageWithRandomSize(),
    background: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'center',
};

export default {
    title: 'Screens/Image',
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <Image layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <Image layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Image layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Image layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);
