/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {
    GoogleMapsClientProvider,
    GoogleKeysProvider,
    RoutesProvider,
    UppyProvider,
    FontsProvider,
    ComponentsContext,
    FORMS_NAMESPACE,
} from '@micromag/core/contexts';
import { slug } from '@micromag/core/utils';
import { ScreensProvider } from '@micromag/screens';
import { FieldsProvider } from '@micromag/fields';

import * as EditorPropTypes from '../lib/PropTypes';
import FormsProvider from './forms/FormsProvider';
import Editor from './Editor';

import defaultRoutes from '../data/routes.json';

const propTypes = {
    routes: EditorPropTypes.routes,
    memoryRouter: PropTypes.node,
    basePath: PropTypes.string,
    uppy: PropTypes.shape({
        transport: PropTypes.string,
    }),
    googleApiKey: PropTypes.string,
    googleMapsLibraries: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
    routes: defaultRoutes,
    memoryRouter: false,
    basePath: null,
    uppy: null,
    googleApiKey: null,
    googleMapsLibraries: ['places'],
};

const EditorContainer = ({
    memoryRouter,
    routes,
    basePath,
    uppy,
    googleApiKey,
    googleMapsLibraries,
    ...props
}) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;

    return (
        <Router basename={!memoryRouter ? basePath : null}>
            <UppyProvider {...uppy}>
                <ScreensProvider>
                    <GoogleKeysProvider apiKey={googleApiKey}>
                        <GoogleMapsClientProvider libraries={googleMapsLibraries}>
                            <FontsProvider>
                                <FieldsProvider>
                                    <FormsProvider>
                                        <ComponentsContext.Consumer>
                                            {(manager) => {
                                                const formComponents = manager.getComponents(
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
                                                        <Editor {...props} />
                                                    </RoutesProvider>
                                                );
                                            }}
                                        </ComponentsContext.Consumer>
                                    </FormsProvider>
                                </FieldsProvider>
                            </FontsProvider>
                        </GoogleMapsClientProvider>
                    </GoogleKeysProvider>
                </ScreensProvider>
            </UppyProvider>
        </Router>
    );
};

EditorContainer.propTypes = propTypes;
EditorContainer.defaultProps = defaultProps;

export default EditorContainer;
