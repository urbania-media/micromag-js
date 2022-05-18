import React from 'react';
import ShareOptions from './ShareOptions';

export default {
    component: ShareOptions,
    title: 'Elements/ShareOptions',
    parameters: {
        intl: true,
    },
};

export const normal = () => (
    <ShareOptions
        title="Test share"
        url="https://micromania.urbania.ca"
        onShare={console.log} // eslint-disable-line
        onShareWindowClose={console.log} // eslint-disable-line
    />
);
