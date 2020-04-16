/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { audio, image, text, background } from '../../../../.storybook/data';

import Audio from '../Audio';
import layouts from '../layouts/names';

const props = {
    ad: audio(),
    background: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'center',
};

export default {
    title: 'Screens/Audio',
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <Audio layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <Audio layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Audio layout={layout} {...props} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const WithImage = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Audio layout={layout} {...props} image={image()} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const WithImageAndText = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Audio layout={layout} {...props} text={text()} image={image()} />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Muted = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Audio layout={layout} {...props} audio={{ ...audio(), muted: true }} />
            </Screen>
        )}
    </LayoutSwitcher>
);
