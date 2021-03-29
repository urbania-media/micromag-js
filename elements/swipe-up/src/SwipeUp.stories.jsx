import React from 'react';
import { IntlProvider } from 'react-intl';

import SwipeUp from './SwipeUp';

export default {
    component: SwipeUp,
    title: 'Elements/SwipeUp',
};

export const normal = () => (
    <IntlProvider>
        <SwipeUp link={{ active: true, url: 'https://google.com'}} />
    </IntlProvider>
);
