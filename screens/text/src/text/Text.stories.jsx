/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, StoryByArrangement } from '@micromag/core';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import Text from './Text';

import arrangements from './arrangements';

const options = {
    Centre: 'center',
    Gauche: 'left',
    Droite: 'right',
    Aucun: null,
};

export default {
    component: Text,
    title: 'Screens/Text',
    decorators: [withKnobs],
};

const props = { text: { body: `<p>${lorem.paragraphs()}</p>` } };

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {arrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={Text}
                itemProps={{ ...props, isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {arrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={Text}
                itemProps={{
                    ...props,
                    isPreview: true,
                }}
            />
        ))}
    </div>
);

export const Top = () => (
    <Story>
        <Text
            isPlaceholder={boolean('isPlaceholder', false)}
            textAlign={select('textAlign', options, 'center')}
            {...props}
        />
    </Story>
);
