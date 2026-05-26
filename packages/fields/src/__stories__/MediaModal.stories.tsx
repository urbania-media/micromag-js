import preview from '#.storybook/preview';
import { useState } from 'react';

import ActionsProviders from '@panneau/actions';
import { QueryProvider } from '@panneau/data';
import DisplaysProvider from '@panneau/displays';
import FiltersProvider from '@panneau/filters';

import { Modals } from '@micromag/core/components';
import { FieldsProvider, ModalsProvider } from '@micromag/core/contexts';
import { ApiProvider } from '@micromag/data';

import MediaModal from '../components/MediaModal';

const meta = preview.meta({
    component: MediaModal,
    title: 'Fields/MediaModal',

    parameters: {
        intl: true,
    },
});
const hasWindow = typeof window !== 'undefined';
const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <ApiProvider baseUrl={apiBaseUrl}>
                <QueryProvider>
                    <FieldsProvider>
                        <ModalsProvider>
                            <DisplaysProvider>
                                <FiltersProvider>
                                    <ActionsProviders>
                                        <MediaModal value={value} onChange={setValue} {...props} />
                                        <Modals />
                                    </ActionsProviders>
                                </FiltersProvider>
                            </DisplaysProvider>
                        </ModalsProvider>
                    </FieldsProvider>
                </QueryProvider>
            </ApiProvider>
        </div>
    );
};

export const normal = meta.story(() => <FieldContainer />);
export const disabled = meta.story(() => <FieldContainer disabled />);
