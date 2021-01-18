import React from 'react';
import { UppyProvider } from '../../packages/core/src/contexts';

const config = {
    key: process.env.TRANSLOADIT_KEY || null,
    templateId: process.env.TRANSLOADIT_TEMPLATE_ID || null,
};

const withUppy = (Story) => {
    if (config.key === null) return <div>Error loading transloadit key</div>;
    return (
        <UppyProvider transport="transloadit" transloadit={config}>
            <Story />
        </UppyProvider>
    );
};

export default withUppy;
