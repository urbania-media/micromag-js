/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import FieldsProvider from '../../../fields/src/FieldsProvider';
import Form from '../components/forms/Form';

const props = {
    fields: [
        {
            name: 'email',
            type: 'email',
        }
    ]
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
