/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Menu from '../components/menus/Menu';

const props = {
    items: [
        {
            id: 'duplicate',
            href: '/duplicate',
            label: 'Duplicate',
            className: null,
        },
        {
            id: 'delete',
            href: null,
            onClick: () => {
                console.log('delete click'); //eslint-disable-line
            },
            label: 'Delete',
            className: null,
        },
    ],
};

export default {
    component: Menu,
    title: 'Core/Menu',
    parameters: {
        intl: true,
        router: true,
    },
};

export const Default = () => <Menu {...props} />;
