/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { GoogleApiClientProvider } from '@micromag/core/contexts';
import { videoFile } from '../../../.storybook/data';
import Video from './Video';

export default {
    component: Video,
    title: 'Elements/Video',
};

export const Normal = () => <Video {...videoFile()} />;

export const Youtube = () => (
    <GoogleApiClientProvider apiKey={process.env.GOOGLE_API_KEY}>
        <Video url="https://www.youtube.com/watch?v=AfeAhCWaMD0" width={640} height={480} />
    </GoogleApiClientProvider>
);
