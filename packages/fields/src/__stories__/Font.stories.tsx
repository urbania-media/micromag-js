/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { UppyProvider } from '@panneau/uppy';

import FieldsProvider from '../FieldsProvider';
import FontsField from '../components/Fonts';

export default {
    title: 'Fields/Font',
    component: FontsField,
    parameters: {
        intl: true,
    },
};

const uppyProps = {
    // transport: 'transloadit',
    // transloadit: {
    //     key: process.env.TRANSLOADIT_KEY || null,
    //     templateId: process.env.TRANSLOADIT_TEMPLATE_ID || null,
    // },
    transport: 'tus',
    tus: {
        endpoint: 'https://micromag.studio.test/tus',
    },
};

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <FieldsProvider>
                <UppyProvider {...uppyProps}>
                    <FontsField value={value} onChange={setValue} {...props} />
                </UppyProvider>
            </FieldsProvider>
        </div>
    );
};

export const normal = () => <FieldContainer />;
