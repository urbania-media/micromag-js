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

export const useViewerSize = () => {
    const { width, height } = useViewerContext();
    return {
        width,
        height,
    };
};

export const useViewerNavigation = () => {
    const { gotoNextScreen, gotoPreviousScreen } = useViewerContext();
    return {
        gotoNextScreen,
        gotoPreviousScreen,
    };
};

export const useViewerEvents = () => {
    const { events } = useViewerContext();
    return events;
};

export const useViewerActivityDetected = () => {
    const { activityDetected = false } = useViewerContext();
    return activityDetected;
};

export const useViewerInteraction = () => {
    const { disableInteraction, enableInteraction } = useViewerContext();
    return { disableInteraction, enableInteraction };
};

export const useViewerWebView = () => {
    const { webView, setWebView } = useViewerContext();

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
    return <ViewerContext value={value}>{children}</ViewerContext>;
}
