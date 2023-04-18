/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    // text,
    // title,
    backgroundImage,
    imageMedia,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import UrbaniaRecommendation from '../UrbaniaRecommendation';
import definition from '../definition';

const props = {
    // category: { body: title() },
    // date: text('short'),
    // title: { body: title() },
    // sponsor: text('short'),
    // description: text('medium'),
    category: { body: 'Pièce de théâtre' },
    date: { body: 'du <strong>14 FÉVRIER</strong> au <strong>5 MARS</strong>' },
    title: { body: 'Blackbird' },
    sponsor: { body: 'suggéré par <strong>banque national</strong>' },
    location: { body: 'suggéré par <strong>banque national</strong>' },
    description: {
        body: '<p><strong>LE PITCH</strong></p><p>Un festival hivernal de musique urbaine pour célébrer le nouvel an à Québec.</p><p><strong>Pourquoi on aime?</strong></p><p>Ambiance festive et programmation électro gratuite. Que demander de plus.</p>',
    },
    visual: { image: imageMedia({ width: 309, height: 223 }), visualLayout: 'label-top' },
    // visual: { visualLayout: 'label-top' },
    background: backgroundImage({ width: 320, height: 480 }),
    transitions: transitions(),
};

export default {
    title: 'Urbania Screens/UrbaniaRecommendation',
    component: UrbaniaRecommendation,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaRecommendation),
    },
};

export const Placeholder = (storyProps) => <UrbaniaRecommendation {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;
export const Static = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;
export const Capture = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;

export const Edit = (storyProps) => <UrbaniaRecommendation {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;

export const WithHeaderFooter = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
