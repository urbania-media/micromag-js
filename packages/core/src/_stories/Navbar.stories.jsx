/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';
import Navbar from '../components/menus/Navbar';
import { RoutesProvider } from '../contexts/RoutesContext';

// const link = {
//     href: '/cool',
//     theme: 'light',
// };

// const action = {
//     onClick: () => {},
//     theme: 'light',
// };

export default {
    component: Navbar,
    title: 'Core/Navbar',
    parameters: {
        intl: true,
    },
};

const inner = (
    <ul className="navbar-nav flex-row ms-auto position-relative">
        <li className="nav-item">
            <a className="nav-link" href="/login">
                Connexion
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/register">
                Inscription
            </a>
        </li>
        <li className="nav-item">
            <a
                className="nav-link"
                href="/login/?locale=en"
                target="_self"
                rel="noopener noreferrer"
            >
                English
            </a>
        </li>
    </ul>
);

export const Light = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Navbar theme="light">{inner}</Navbar>
        </MemoryRouter>
    </RoutesProvider>
);

export const Dark = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Navbar theme="dark">{inner}</Navbar>
        </MemoryRouter>
    </RoutesProvider>
);

export const Primary = () => (
    <RoutesProvider>
        <MemoryRouter>
            <Navbar theme="primary">{inner}</Navbar>
        </MemoryRouter>
    </RoutesProvider>
);
