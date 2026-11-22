import isString from 'lodash-es/isString';
import { ReactNode, createContext, use, useMemo, useState } from 'react';
import EventEmitter from 'wolfy87-eventemitter';

interface ViewerContextType {
    events: EventEmitter;
    menuVisible: boolean;
    menuOverScreen: boolean;
    width: number | null;
    height: number | null;
    activityDetected: boolean;
    topHeight: number;
    bottomHeight: number;
    bottomSidesWidth: number;
    gotoNextScreen: () => void;
    gotoPreviousScreen: () => void;
    disableInteraction: () => void;
    enableInteraction: () => void;
    webView: { url: string; [key: string]: unknown } | null;
    setWebView: (webView: { url: string; [key: string]: unknown } | null) => void;
}

const defaultValue = {
    events: new EventEmitter(),
    menuVisible: false,
    menuOverScreen: false,
    activityDetected: false,
    width: null,
    height: null,
    topHeight: 0,
    bottomHeight: 0,
    bottomSidesWidth: 0,
    gotoNextScreen: () => {},
    gotoPreviousScreen: () => {},
    disableInteraction: () => {},
    enableInteraction: () => {},
};

export const ViewerContext = createContext<ViewerContextType>({
    ...defaultValue,
    webView: null,
    setWebView: () => {},
});

export const useViewerContext = () => use(ViewerContext);

/*
 * Parts of the viewer context, each in its own context, so that a component reading one part does
 * not render again when another one changes (ex.: `activityDetected` changes at every pointer
 * activity, the safe zones when the playback controls show). `ViewerContext` still holds every
 * value for `useViewerContext()`. The hooks below fall back to `ViewerContext` when it is provided
 * without `ViewerProvider`.
 */
type ViewerSizeContextType = Pick<ViewerContextType, 'width' | 'height'>;
type ViewerNavigationContextType = Pick<ViewerContextType, 'gotoNextScreen' | 'gotoPreviousScreen'>;
type ViewerInteractionContextType = Pick<
    ViewerContextType,
    'disableInteraction' | 'enableInteraction'
>;
type ViewerWebViewContextType = Pick<ViewerContextType, 'webView' | 'setWebView'>;

const ViewerSizeContext = createContext<ViewerSizeContextType | null>(null);
const ViewerNavigationContext = createContext<ViewerNavigationContextType | null>(null);
const ViewerEventsContext = createContext<EventEmitter | null>(null);
const ViewerActivityContext = createContext<boolean | null>(null);
const ViewerInteractionContext = createContext<ViewerInteractionContextType | null>(null);
const ViewerWebViewContext = createContext<ViewerWebViewContextType | null>(null);

export const useViewerSize = () => {
    const { width, height } = use(ViewerSizeContext) || use(ViewerContext);
    return {
        width,
        height,
    };
};

export const useViewerNavigation = () => {
    const { gotoNextScreen, gotoPreviousScreen } =
        use(ViewerNavigationContext) || use(ViewerContext);
    return {
        gotoNextScreen,
        gotoPreviousScreen,
    };
};

export const useViewerEvents = () => {
    const events = use(ViewerEventsContext);
    return events !== null ? events : use(ViewerContext).events;
};

export const useViewerActivityDetected = () => {
    const activityDetected = use(ViewerActivityContext);
    if (activityDetected !== null) {
        return activityDetected;
    }
    const { activityDetected: contextActivityDetected = false } = use(ViewerContext);
    return contextActivityDetected;
};

export const useViewerInteraction = () => {
    const { disableInteraction, enableInteraction } =
        use(ViewerInteractionContext) || use(ViewerContext);
    return { disableInteraction, enableInteraction };
};

export const useViewerWebView = () => {
    const { webView, setWebView } = use(ViewerWebViewContext) || use(ViewerContext);

    const value = useMemo(
        () => ({
            ...webView,
            opened: webView !== null,
            open: (newWebView) =>
                setWebView(
                    isString(newWebView)
                        ? {
                              url: newWebView,
                          }
                        : newWebView,
                ),
            close: () => setWebView(null),
            update: (newWebView) =>
                setWebView({
                    ...webView,
                    ...newWebView,
                }),
        }),
        [webView, setWebView],
    );
    return value;
};

interface ViewerProviderProps {
    children: ReactNode;
    events: EventEmitter;
    menuVisible?: boolean;
    menuOverScreen?: boolean;
    activityDetected?: boolean;
    width?: number;
    height?: number;
    topHeight?: number;
    bottomHeight?: number;
    bottomSidesWidth?: number;
    gotoNextScreen?: (...args: unknown[]) => void;
    gotoPreviousScreen?: (...args: unknown[]) => void;
    disableInteraction?: (...args: unknown[]) => void;
    enableInteraction?: (...args: unknown[]) => void;
}

export function ViewerProvider({
    children,
    events,
    menuVisible = false,
    menuOverScreen = false,
    activityDetected = false,
    width,
    height,
    topHeight = 0,
    bottomHeight = 0,
    bottomSidesWidth = 0,
    gotoNextScreen = () => {},
    gotoPreviousScreen = () => {},
    disableInteraction = () => {},
    enableInteraction = () => {},
}: ViewerProviderProps) {
    const [webView, setWebView] = useState(null);

    const value = {
        events,
        menuVisible,
        menuOverScreen,
        activityDetected,
        width,
        height,
        topHeight,
        bottomHeight,
        bottomSidesWidth,
        gotoNextScreen,
        gotoPreviousScreen,
        disableInteraction,
        enableInteraction,
        webView,
        setWebView,
    };
    const size = { width, height };
    const navigation = { gotoNextScreen, gotoPreviousScreen };
    const interaction = { disableInteraction, enableInteraction };
    const webViewValue = { webView, setWebView };
    return (
        <ViewerContext value={value}>
            <ViewerSizeContext value={size}>
                <ViewerNavigationContext value={navigation}>
                    <ViewerEventsContext value={events}>
                        <ViewerActivityContext value={activityDetected}>
                            <ViewerInteractionContext value={interaction}>
                                <ViewerWebViewContext value={webViewValue}>
                                    {children}
                                </ViewerWebViewContext>
                            </ViewerInteractionContext>
                        </ViewerActivityContext>
                    </ViewerEventsContext>
                </ViewerNavigationContext>
            </ViewerSizeContext>
        </ViewerContext>
    );
}
