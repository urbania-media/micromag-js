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
import { quote, author, source, background } from '../../../../.storybook/data';

import Quote from '../Quote';
import layouts from '../layouts/names';

const props = {
    quote: { body: quote(), style: { text: { color: '#FFF' } } },
    author: { body: author() },
    source: { body: source() },
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
    title: 'Screens/Quote',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <LayoutGrid layouts={layouts}>
        {layout => (
            <PlaceholderScreen>
                <Quote layout={layout} renderFormat="placeholder" />
            </PlaceholderScreen>
        )}
    </LayoutGrid>
);

export const Previews = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <PreviewScreen>
                <Quote layout={layout} renderFormat="preview" {...props} />
            </PreviewScreen>
        )}
    </LayoutSwitcher>
);

export const Editor = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Quote layout={layout} renderFormat="edit" />
            </Screen>
        )}
    </LayoutSwitcher>
);

export const Normal = () => (
    <LayoutSwitcher {...switcherProps}>
        {layout => (
            <Screen>
                <Quote
                    layout={layout}
                    textAlign={select('textAlign', options, 'center')}
                    {...props}
                />
            </Screen>
        )}
    </LayoutSwitcher>
);
