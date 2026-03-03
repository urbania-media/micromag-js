/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React from 'react';

import Button from '../components/buttons/Button';

const link = {
    href: '/cool',
    theme: 'light',
};

const action = {
    onClick: () => {},
    theme: 'light',
};

const meta = preview.meta({
    component: Button,
    title: 'Core/Button',

    parameters: {
        intl: true,
        router: true,
    },
});

export const Link = meta.story(() => <Button {...link}>Cool click</Button>);

export const DisabledLink = meta.story(() => (
    <Button {...link} disabled>
        Cool click
    </Button>
));

export const Action = meta.story(() => <Button {...action}>Cool click</Button>);

export const DisabledAction = meta.story(() => (
    <Button {...action} disabled>
        Cool click
    </Button>
));
