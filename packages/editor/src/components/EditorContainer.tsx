import '../styles/styles.global.css';

import { createPathToRegexpParser } from '@folklore/routes';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';

import { UppyProvider } from '@panneau/uppy';

import type { Story, StoryTheme } from '@micromag/core';
import {
    ComponentsContext,
    EditorProvider,
    FORMS_NAMESPACE,
    FontsProvider,
    GoogleKeysProvider,
    GoogleMapsClientProvider,
    RoutesProvider,
    StoryProvider, // UppyProvider,
    VisitorProvider,
} from '@micromag/core/contexts';
import { slug } from '@micromag/core/utils';
import { FieldsProvider } from '@micromag/fields';
import { ScreensProvider } from '@micromag/screens';

import Editor, { EditorProps } from './Editor';
import FormsProvider from './forms/FormsProvider';

import defaultRoutes from '../data/routes.json';

const pathToRegexpParser = createPathToRegexpParser();

interface EditorContainerProps extends EditorProps {
    value?: Story | StoryTheme | null;
    routes?: unknown;
    memoryRouter?: boolean;
    basePath?: string | null;
    uppy?: { transport?: string } | null;
    googleApiKey?: string | null;
    googleMapsLibraries?: string[];
    screenNamespaces?: string[] | null;
}

function EditorContainer({
    value = null,
    memoryRouter = false,
    routes = defaultRoutes,
    basePath = null,
    uppy = null,
    googleApiKey = null,
    googleMapsLibraries = ['places'],
    screenNamespaces = null,
    ...props
}: EditorContainerProps) {
    const { locale } = useIntl();

    const { hook: memoryLocationHook, searchHook: memorySearchHook } = memoryLocation();
    const routerProps = useMemo(
        () => ({
            hook: memoryRouter ? memoryLocationHook : null,
            searchHook: memoryRouter ? memorySearchHook : null,
            parser: pathToRegexpParser,
            base: !memoryRouter ? basePath : null,
        }),
        [basePath, memoryRouter],
    );

    return (
        <Router {...routerProps}>
            <UppyProvider {...uppy}>
                <StoryProvider story={value}>
                    <ScreensProvider filterNamespaces namespaces={screenNamespaces}>
                        <GoogleKeysProvider apiKey={googleApiKey}>
                            <GoogleMapsClientProvider
                                locale={locale}
                                libraries={googleMapsLibraries}
                            >
                                <FontsProvider>
                                    <FieldsProvider>
                                        <FormsProvider>
                                            <EditorProvider>
                                                <VisitorProvider visitor="editor">
                                                    <ComponentsContext.Consumer>
                                                        {(manager) => {
                                                            const formComponents =
                                                                manager.getComponents(
                                                                    FORMS_NAMESPACE,
                                                                );
                                                            const formRegEx =
                                                                formComponents !== null
                                                                    ? Object.keys(formComponents)
                                                                          .map((name) => slug(name))
                                                                          .join('|')
                                                                    : null;
                                                            return (
                                                                <RoutesProvider
                                                                    routes={{
                                                                        ...routes,
                                                                        'screen.field.form': routes[
                                                                            'screen.field.form'
                                                                        ].replace(
                                                                            /:form$/,
                                                                            `:form(${formRegEx})`,
                                                                        ),
                                                                    }}
                                                                >
                                                                    <Editor
                                                                        value={value}
                                                                        {...props}
                                                                    />
                                                                </RoutesProvider>
                                                            );
                                                        }}
                                                    </ComponentsContext.Consumer>
                                                </VisitorProvider>
                                            </EditorProvider>
                                        </FormsProvider>
                                    </FieldsProvider>
                                </FontsProvider>
                            </GoogleMapsClientProvider>
                        </GoogleKeysProvider>
                    </ScreensProvider>
                </StoryProvider>
            </UppyProvider>
        </Router>
    );
}

export default EditorContainer;
