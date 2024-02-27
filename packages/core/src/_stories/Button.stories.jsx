/* eslint-disable react/jsx-props-no-spreading */
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

export default {
    component: Button,
    title: 'Core/Button',
    parameters: {
        intl: true,
        router: true,
    },
};

export const Link = () => <Button {...link}>Cool click</Button>;

export const DisabledLink = () => (
    <Button {...link} disabled>
        Cool click
    </Button>
);

export const Action = () => <Button {...action}>Cool click</Button>;

export const DisabledAction = () => (
    <Button {...action} disabled>
        Cool click
    </Button>
);
