/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */

// https://github.com/folkloreinc/folklore-js/blob/master/packages/fetch/src/csrf.js
// https://github.com/folkloreinc/folklore-js/blob/master/packages/tracking/src/Tracking.js

import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Screen } from '@micromag/core/components';
import {
    useResizeObserver,
    useAnimationFrame,
    useFormattedDate,
    useFormattedTime,
    useDocumentEvent,
    useForm,
    useFormTransition,
    useIsVisible,
    useMediaApi,
    useMediasParser,
    useParsedStory,
    useThemeParser,
    useScreenSizeFromElement,
    useScreenSizeFromWindow,
    useSwipe,
    useTrackVideo,
    useTrackScreenView,
    useTrackEvent,
    useTrackAudio,
    useWindowEvent,
    useObserver,
} from '@micromag/core/hooks';
import {
    ComponentsProvider,
    useComponent,
    useComponents,
    useComponentsManager,
    useElementComponent,
    useElementsComponents,
    useElementsComponentsManager,
    useFieldsComponents,
    useFieldsComponentsManager,
    useFormComponent,
    useFormsComponents,
    useFormsComponentsManager,
    useModalComponent,
    useModalsComponents,
    useModalsComponentsManager,
    useScreenComponent,
    useScreensComponents,
    useScreensComponentsManager,
    useFieldsManager,
    useFieldDefinition,
    FieldsProvider,
    useGoogleApiClient,
    GoogleApiClientProvider,
    useGoogleMapsClient,
    GoogleMapsClientProvider,
    useMediasRepository,
    MediasProvider,
    useModals,
    ModalsProvider,
    usePanels,
    PanelsProvider,
    useRoutes,
    RoutesProvider,
    useUrlGenerator,
    useRoutePush,
    useRouteBack,
    useScreen,
    useScreenDefinition,
    useScreenData,
    useScreenRenderContext,
    ScreenProvider,
    useScreensManager,
    ScreensProvider as ScreensProviderContext,
    useScreenSize,
    ScreenSizeProvider,
    ThemeProvider,
    useTheme,
    useTracking,
    TrackingProvider,
    useUppy,
    UppyProvider,
    useViewer,
    ViewerProvider,
} from '@micromag/core/contexts';

import { ScreensProvider } from '@micromag/screens';

import MenuDots from './menus/MenuDots';
import MenuIcon from './menus/MenuIcon';
import MenuPreview from './menus/MenuPreview';

import styles from '../styles/test.module.scss';

const propTypes = {
    test: PropTypes.bool,
    text: MicromagPropTypes.text,
};

const defaultProps = {
    test: false,
    text: null,
};

const InnerTest = () => {
    // CONTEXTS --------------------------------------------------------

    // Components
    const componentsManager = useComponentsManager();
    const components = useComponents();
    const component = useComponent();
    const fieldsComponentsManager = useFieldsComponentsManager();
    const fieldsComponent = useFieldsComponents();
    const fieldComponent = useFieldsComponents();
    const screensComponentsManager = useScreensComponentsManager();
    const screensComponents = useScreensComponents();
    const screenComponent = useScreenComponent();
    const formsComponentsManager = useFormsComponentsManager();
    const formsComponents = useFormsComponents();
    const formComponent = useFormComponent();
    const modalsComponentsManager = useModalsComponentsManager();
    const modalsComponents = useModalsComponents();
    const modalComponent = useModalComponent();
    const elementsComponentsManager = useElementsComponentsManager();
    const elementsComponents = useElementsComponents();
    const elementComponent = useElementComponent();

    // Fields
    const fieldsManager = useFieldsManager();
    const fieldDefinition = useFieldDefinition();

    // GoogleApi
    const googleApiClient = useGoogleApiClient();

    // GoogleMaps
    const googleMapsClient = useGoogleMapsClient();

    // Medias
    const mediasRepository = useMediasRepository();

    // Modals
    const modals = useModals();

    // Panels
    const panels = usePanels();

    // Routes
    const routes = useRoutes();
    const urlGenerator = useUrlGenerator();
    const urlPush = useRoutePush();
    const routeBack = useRouteBack();

    // Screen
    const screen = useScreen();
    const screenDefinition = useScreenDefinition();
    const screenData = useScreenData();
    const screenRenderContext = useScreenRenderContext();

    // Screens
    const screensManager = useScreensManager();

    // ScreenSize
    const screenSize = useScreenSize();

    // Theme
    const theme = useTheme();

    // Tracking
    const tracking = useTracking();

    // Uppy
    const uppy = useUppy();

    // Viewer
    const viewer = useViewer();

    // HOOKS -----------------------------------------------------------

    // Basic
    const [state, setState] = useState(false);
    useEffect(() => {}, []);

    // AnimationFrame
    useAnimationFrame(() => {}, { disabled: true });

    // Dates
    const getDate = useFormattedDate();
    const getTime = useFormattedTime();

    // DocumentEvents
    useDocumentEvent('click', () => {}, false);

    // Form
    // const form = useForm();

    // FormTransition
    const formTransition = useFormTransition();

    // Visible
    const visible = useIsVisible();

    // MediaApi
    const mediaApi = useMediaApi();

    // MediaParser
    const mediasParser = useMediasParser();

    // Observer
    const observer = useObserver();
    const {
        ref: refResize,
        entry: { contentRect: contentRectResize },
    } = useResizeObserver();

    // ParsedStory
    const parsedStory = useParsedStory();

    // ScreenSize
    const { ref: refScreenSizeEl, screenSize: screenSizeEl } = useScreenSizeFromElement();
    const {
        screen: screenSizeWindow,
        screens: screensSizeWindow,
        width: widthWidth,
        height: heightWindow,
    } = useScreenSizeFromWindow();

    // Swipe
    const swipe = useSwipe();

    // ThemeParser
    const themeParser = useThemeParser();

    // Tracking
    const trackScreenView = useTrackScreenView();
    const trackEvent = useTrackEvent();
    const trackAudio = useTrackAudio();
    const trackVideo = useTrackVideo();

    // WindowEvent
    const windowEvent = useWindowEvent();

    return (
        <>
            <div className={styles.menu}>
                <MenuDots />
                <MenuIcon />
                <MenuPreview />
            </div>
            <div className={styles.screens}>
                { /* <ScreensProvider /> */}
            </div>
        </>
    );
};

const Test = ({ test, text }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.oui]: test,
                    [styles.non]: !test,
                },
            ])}
        >
            <IntlProvider locale="en">
                <ComponentsProvider>
                    <FieldsProvider>
                        <GoogleApiClientProvider apiKey="">
                            <GoogleMapsClientProvider apiKey="">
                                <MediasProvider>
                                    <ModalsProvider>
                                        <PanelsProvider>
                                            <RoutesProvider routes={{}}>
                                                <ScreenProvider>
                                                    <ScreensProviderContext>
                                                        <ScreenSizeProvider>
                                                            <ThemeProvider>
                                                                {/* <TrackingProvider> */}
                                                                <UppyProvider>
                                                                    <ViewerProvider>
                                                                        <InnerTest />
                                                                    </ViewerProvider>
                                                                </UppyProvider>
                                                                {/* </TrackingProvider> */}
                                                            </ThemeProvider>
                                                        </ScreenSizeProvider>
                                                    </ScreensProviderContext>
                                                </ScreenProvider>
                                            </RoutesProvider>
                                        </PanelsProvider>
                                    </ModalsProvider>
                                </MediasProvider>
                            </GoogleMapsClientProvider>
                        </GoogleApiClientProvider>
                    </FieldsProvider>
                </ComponentsProvider>
            </IntlProvider>
        </div>
    );
};

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

export default Test;
