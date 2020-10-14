/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import {
    PlaceholderScreen,
    PreviewScreen,
    LayoutGrid,
    LayoutSwitcher,
    Screen,
} from '../../../../.storybook/components';
import { title, subtitle, text } from '../../../../.storybook/data';

import Title, { layouts } from '../Title';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    description: text(),
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    title: 'Screens/Title',
    decorators: [withKnobs],
};

// eslint-disable-next-line
export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <Title layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <PreviewScreen>
                <Title
                    layout={layout}
                    renderFormat="preview"
                    {...props}
                    textAlign={select('textAlign', options, 'center')}
                />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <Title layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher layouts={layouts}>
        {layout => (
            <Screen>
                <Title
                    layout={layout}
                    {...props}
                    textAlign={select('textAlign', options, 'center')}
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
