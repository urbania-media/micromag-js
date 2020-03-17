import React from 'react';
import { GoogleApiClientProvider } from '@micromag/core/contexts';
import Video from './Video';
import './VideoYouTube';

export default {
    component: Video,
    title: 'Components/Video',
};

export const normal = () => (
    <GoogleApiClientProvider apiKey={process.env.GOOGLE_API_KEY}>
        <Video url="https://www.youtube.com/watch?v=AfeAhCWaMD0" width={640} height={480} />
    </GoogleApiClientProvider>
);
