import '../styles/styles.global.css';

import { createPathToRegexpParser } from '@folklore/routes';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';

import { UppyProvider, type UppyProviderConfig } from '@panneau/uppy';

import {
    FontsProvider,
    GoogleKeysProvider,
    GoogleMapsClientProvider,
    ModalsProvider,
    PanelsProvider,
    VisitorProvider,
} from '@micromag/core/contexts';
import { FieldsProvider } from '@micromag/fields';
import { ScreensProvider } from '@micromag/screens';

import Editor, { EditorProps } from './Editor';
import EditorRoutesProvider from './RoutesProvider';
import FormsProvider from './forms/FormsProvider';

import defaultRoutes from '../data/routes.json';

const pathToRegexpParser = createPathToRegexpParser();

interface EditorContainerProps extends EditorProps {
    routes?: Record<string, string>;
    memoryRouter?: boolean;
    basePath?: string | null;
    uppy?: UppyProviderConfig | null;
    googleApiKey?: string | null;
    googleMapsLibraries?: string[];
    screenNamespaces?: string[] | null;
}

function EditorContainer({
    memoryRouter = false,
    routes = defaultRoutes,
    basePath = null,
    uppy = null,
    googleApiKey = null,
    googleMapsLibraries,
    screenNamespaces = null,
    ...props
}: EditorContainerProps) {
    const { locale } = useIntl();
    const [{ hook: memoryLocationHook, searchHook: memorySearchHook }] = useState(() =>
        memoryLocation(),
    );
    return (
        <Router
            hook={memoryRouter ? memoryLocationHook : undefined}
            searchHook={memoryRouter ? memorySearchHook : undefined}
            parser={pathToRegexpParser}
            base={!memoryRouter ? basePath : undefined}
        >
            <UppyProvider {...uppy}>
                <ScreensProvider filterNamespaces namespaces={screenNamespaces}>
                    <GoogleKeysProvider apiKey={googleApiKey}>
                        <GoogleMapsClientProvider locale={locale} libraries={googleMapsLibraries}>
                            <FontsProvider>
                                <FieldsProvider>
                                    <FormsProvider>
                                        <ModalsProvider>
                                            <PanelsProvider>
                                                <VisitorProvider visitor="editor">
                                                    <EditorRoutesProvider routes={routes}>
                                                        <Editor {...props} />
                                                    </EditorRoutesProvider>
                                                </VisitorProvider>
                                            </PanelsProvider>
                                        </ModalsProvider>
                                    </FormsProvider>
                                </FieldsProvider>
                            </FontsProvider>
                        </GoogleMapsClientProvider>
                    </GoogleKeysProvider>
                </ScreensProvider>
            </UppyProvider>
        </Router>
    );
}

export default EditorContainer;
