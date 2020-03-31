/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { title, subtitle, paragraph } from '../../../../.storybook/data';

import TitleGrouped from '../TitleGrouped';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    description: { body: paragraph() },
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: TitleGrouped,
    title: 'Screens/TitleGrouped',
    decorators: [withKnobs],
};

export const TopTitle = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopTitleReverse = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopSubtitle = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopSubtitleReverse = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopDescription = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopDescriptionReverse = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopDescriptionBottomSubtitle = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TopDescriptionBottomSubtitleReverse = () => (
    <TitleGrouped
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);
