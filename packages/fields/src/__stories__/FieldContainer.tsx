/* eslint-disable @eslint-react/no-clone-element */
import { Children, ReactNode, cloneElement, useState } from 'react';

import ActionsProviders from '@panneau/actions';
import { QueryProvider } from '@panneau/data';
import DisplaysProvider from '@panneau/displays';
import FiltersProvider from '@panneau/filters';
import { IntlProvider } from '@panneau/intl';
import '@panneau/intl/locale/fr';

import { Modals } from '@micromag/core/components';
import { FieldsProvider, ModalsProvider } from '@micromag/core/contexts';
import { ApiProvider } from '@micromag/data';

const hasWindow = typeof window !== 'undefined';
const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

function FieldContainer({ children }: { children: ReactNode }) {
    const [value, setValue] = useState(null);
    return (
        <IntlProvider>
            <ApiProvider baseUrl={apiBaseUrl}>
                <QueryProvider>
                    <FieldsProvider>
                        <ModalsProvider>
                            <DisplaysProvider>
                                <FiltersProvider>
                                    <ActionsProviders>
                                        {cloneElement(Children.only(children), {
                                            value,
                                            onChange: setValue,
                                        })}
                                        <Modals />
                                    </ActionsProviders>
                                </FiltersProvider>
                            </DisplaysProvider>
                        </ModalsProvider>
                    </FieldsProvider>
                </QueryProvider>
            </ApiProvider>
        </IntlProvider>
    );
}

export default FieldContainer;
