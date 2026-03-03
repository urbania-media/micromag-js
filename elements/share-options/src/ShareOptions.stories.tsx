import preview from '#.storybook/preview';
import React from 'react';

import ShareOptions from './ShareOptions';

const meta = preview.meta({
    component: ShareOptions,
    title: 'Elements/ShareOptions',

    parameters: {
        intl: true,
    },
});

export const normal = meta.story(() => (
    <ShareOptions
        title="Test share"
        url="https://micromania.urbania.ca"
        onShare={console.log} // eslint-disable-line
        onShareWindowClose={console.log} // eslint-disable-line
    />
));
