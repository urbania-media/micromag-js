/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { UppyProvider } from '@panneau/uppy';

const props = {
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

const withUppy = (Story) => (
    <UppyProvider {...props}>
        <Story />
    </UppyProvider>
);

export default withUppy;
