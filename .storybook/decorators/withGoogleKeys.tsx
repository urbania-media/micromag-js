import React from 'react';

import { GoogleKeysProvider } from '../../packages/core/src/contexts';

const withGoogleKeys = (Story) => {
    const apiKey = process.env.GOOGLE_API_KEY || process.env.STORYBOOK_GOOGLE_API_KEY || null;
    // if (apiKey === null)
    //     return (
    //         <div>Error loading api key. Ensure you have GOOGLE_API_KEY environment variable</div>
    //     );
    return (
        <GoogleKeysProvider apiKey={apiKey}>
            <Story />
        </GoogleKeysProvider>
    );
};

export default withGoogleKeys;
