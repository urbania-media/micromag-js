/* eslint-disable react/jsx-props-no-spreading */
import { createPathToRegexpParser, useMemoryRouter } from '@folklore/routes';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Router } from 'wouter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    ComponentsContext,
    EditorProvider,
    FontsProvider,
    FORMS_NAMESPACE,
    GoogleKeysProvider,
    GoogleMapsClientProvider,
    RoutesProvider,
    StoryProvider,
    UppyProvider,
    VisitorProvider,
} from '@micromag/core/contexts';
import { slug } from '@micromag/core/utils';
import { FieldsProvider } from '@micromag/fields';
import { ScreensProvider } from '@micromag/screens';

import * as EditorPropTypes from '../lib/PropTypes';

import Editor from './Editor';
import FormsProvider from './forms/FormsProvider';

import defaultRoutes from '../data/routes.json';

const pathToRegexpParser = createPathToRegexpParser();

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    routes: EditorPropTypes.routes,
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    uppy: PropTypes.shape({
        transport: PropTypes.string,
    }),
    googleApiKey: PropTypes.string,
    googleMapsLibraries: PropTypes.arrayOf(PropTypes.string),
    screenNamespaces: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
    value: null,
    routes: defaultRoutes,
    memoryRouter: false,
    basePath: null,
    uppy: null,
    googleApiKey: null,
    googleMapsLibraries: ['places'],
    screenNamespaces: null,
};

const EditorContainer = ({
    value,
    memoryRouter,
    routes,
    basePath,
    uppy,
    googleApiKey,
    googleMapsLibraries,
    screenNamespaces,
    ...props
}) => {
    const { locale } = useIntl();

    // const { metadata } = value || {};
    // const { language:finalLocale = locale } = metadata || {};
    const { hook: memoryLocationHook, searchHook: memorySearchHook } = useMemoryRouter();

    return (
        <Router
            hook={memoryRouter ? memoryLocationHook : null}
            searchHook={memoryRouter ? memorySearchHook : null}
            parser={pathToRegexpParser}
            base={!memoryRouter ? basePath : null}
        >
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
};

EditorContainer.propTypes = propTypes;
EditorContainer.defaultProps = defaultProps;

export default EditorContainer;
