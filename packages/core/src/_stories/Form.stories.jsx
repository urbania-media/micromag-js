/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import FieldsProvider from '../../../fields/src/FieldsProvider';
import Form from '../components/forms/Form';

const props = {
    fields: [
        {
            name: 'email',
            type: 'email',
        },
    ],
};

const withRequiredProps = {
    fields: [
        {
            name: 'text',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
        },
        {
            label: 'section',
            type: 'fields',
            isSection: true,
            fields: [
                {
                    name: 'text-thing',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
};

export default {
    component: Form,
    title: 'Core/Form',
    parameters: {
        intl: true,
    },
};

export const Default = () => (
    <FieldsProvider>
        <Form {...props} />
    </FieldsProvider>
);

export const withRequired = () => (
    <FieldsProvider>
        <Form {...withRequiredProps} />
    </FieldsProvider>
);
