/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { FieldsProvider } from '@micromag/fields';
import { withScreenSize } from '../../../../.storybook/decorators';
import { Basic } from '../../../../.storybook/screens';
// import { paragraph, image } from '../../../../.storybook/data';

import MediaGallery from '../components/MediaGallery';

const props = {
    value: {
        components: Basic,
    },
};

export default {
    component: MediaGallery,
    title: 'MediaGallery',
    decorators: [withKnobs, withScreenSize()],
};

export const Normal = () => (
    <FieldsProvider>
        <IntlProvider>
            <MemoryRouter>
                <MediaGallery {...props} />
            </MemoryRouter>
        </IntlProvider>
    </FieldsProvider>
);
