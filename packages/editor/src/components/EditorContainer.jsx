/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
    StoryProvider,
    GoogleMapsClientProvider,
    GoogleKeysProvider,
    RoutesProvider,
    UppyProvider,
    FontsProvider,
    ComponentsContext,
    EditorProvider,
    FORMS_NAMESPACE,
} from '@micromag/core/contexts';
import { slug } from '@micromag/core/utils';
import { ScreensProvider } from '@micromag/screens';
import { FieldsProvider } from '@micromag/fields';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import * as EditorPropTypes from '../lib/PropTypes';
import FormsProvider from './forms/FormsProvider';
import Editor from './Editor';

import defaultRoutes from '../data/routes.json';

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
};

const defaultProps = {
    value: null,
    routes: defaultRoutes,
    memoryRouter: false,
    basePath: null,
    uppy: null,
    googleApiKey: null,
    googleMapsLibraries: ['places'],
};

const EditorContainer = ({
    value,
    memoryRouter,
    routes,
    basePath,
    uppy,
    googleApiKey,
    googleMapsLibraries,
    ...props
}) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;
    const { locale } = useIntl();

    // const { metadata } = value || {};
    // const { language:finalLocale = locale } = metadata || {};
    //

    return (
        <Router basename={!memoryRouter ? basePath : null}>
            <UppyProvider {...uppy}>
                <StoryProvider story={value}>
                    <ScreensProvider>
                        <GoogleKeysProvider apiKey={googleApiKey}>
                            <GoogleMapsClientProvider locale={locale} libraries={googleMapsLibraries}>
                                <FontsProvider>
                                    <FieldsProvider>
                                        <FormsProvider>
                                            <EditorProvider>
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
                                                                <Editor value={value} {...props} />
                                                            </RoutesProvider>
                                                        );
                                                    }}
                                                </ComponentsContext.Consumer>
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
