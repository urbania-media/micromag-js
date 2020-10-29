/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { RoutesProvider, ComponentsContext, FORMS_NAMESPACE } from '@micromag/core/contexts';
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
};

const defaultProps = {
    routes: defaultRoutes,
    memoryRouter: false,
    basePath: null,
};

const EditorContainer = ({ memoryRouter, routes, basePath, ...props }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;

    return (
        <Router basename={!memoryRouter ? basePath : null}>
            <ScreensProvider>
                <FieldsProvider>
                    <FormsProvider>
                        <ComponentsContext.Consumer>
                            {({ components }) => {
                                const formComponents =
                                    components !== null
                                        ? components[FORMS_NAMESPACE] || null
                                        : null;
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
                                            ].replace(/:form$/, `:form(${formRegEx})`),
                                        }}
                                    >
                                        <Editor {...props} />
                                    </RoutesProvider>
                                );
                            }}
                        </ComponentsContext.Consumer>
                    </FormsProvider>
                </FieldsProvider>
            </ScreensProvider>
        </Router>
    );
};

EditorContainer.propTypes = propTypes;
EditorContainer.defaultProps = defaultProps;

export default EditorContainer;
