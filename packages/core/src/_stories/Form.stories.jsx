/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import FieldsProvider from '../../../fields/src/FieldsProvider';
import Form from '../components/forms/Form';
import FormPanel from '../components/forms/FormPanel';

const hasWindow = typeof window !== 'undefined';
const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

const props = {
    fields: [
        {
            name: 'email',
            type: 'email',
        },
    ],
    action: '#',
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
    action: '#'
};

const withSlideProps = {
    fields: [
        {
            name: 'text',
            type: 'text',
            required: true,
            settings: true,
        },
        {
            name: 'logo',
            type: 'image',
            label: 'Logo',
        },
        {
            name: 'color',
            type: 'color',
            label: 'Color',
        },
        {
            name: 'fontStyle',
            type: 'font-style',
        },
        {
            name: 'background',
            type: 'background',
        },
    ],
    action: '#',
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
        <Form {...props} onCancel={() => {}} />
    </FieldsProvider>
);

export const withRequired = () => (
    <FieldsProvider>
        <Form {...withRequiredProps} />
    </FieldsProvider>
);

export const withSlide = () => (
    <ApiProvider baseUrl={apiBaseUrl}>
        <FieldsProvider>
            <FormPanel>
                <Form {...withSlideProps} />
            </FormPanel>
        </FieldsProvider>
    </ApiProvider>
);
