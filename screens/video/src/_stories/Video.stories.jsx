/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutSwitcher,
    LayoutGrid,
    Screen,
} from '../../../../.storybook/components';
import { videoFile, background } from '../../../../.storybook/data';

import Video from '../Video';

const layouts = ['center', 'full', 'loop'];

const props = {
    video: videoFile(),
    background: background(),
};

const switcherProps = {
    layouts,
    defaultLayout: 'center',
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    title: 'Screens/Video',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <Video layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <Video layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Video
                    layout={layout}
                    textAlign={select('textAlign', options, 'center')}
                    {...props}
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
