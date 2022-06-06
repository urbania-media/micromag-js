/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';
import Button from '../components/buttons/Button';
import { RoutesProvider } from '../contexts/RoutesContext';

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
    },
};

export const Link = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Button {...link}>Cool click</Button>
        </MemoryRouter>
    </RoutesProvider>
);

export const DisabledLink = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Button {...link} disabled>
                Cool click
            </Button>
        </MemoryRouter>
    </RoutesProvider>
);

export const Action = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Button {...action}>Cool click</Button>
        </MemoryRouter>
    </RoutesProvider>
);

export const DisabledAction = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Button {...action} disabled>
                Cool click
            </Button>
        </MemoryRouter>
    </RoutesProvider>
);
