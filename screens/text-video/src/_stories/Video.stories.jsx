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
import { text, video, background } from '../../../../.storybook/data';

import TextVideo, { layouts } from '../TextVideo';

const props = {
    text: text(),
    video: video(),
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
    title: 'Screens/TextVideo',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <TextVideo layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <TextVideo layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <TextVideo layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <TextVideo
                    layout={layout}
                    textAlign={select('textAlign', options, 'center')}
                    {...props}
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
