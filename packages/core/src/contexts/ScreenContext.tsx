/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';
import type { RenderContext, ScreenComponent, ScreenDefinition } from '../lib';
import { getScreenExtraField } from '../utils';
import { useScreensManager } from './ScreensContext';

export const ScreenContext = React.createContext({
    data: null,
    definition: null,
    renderContext: null,
});

export const useScreen = () => useContext(ScreenContext);

export const useScreenDefinition = () => {
    const intl = useIntl();
    const { definition = null } = useScreen() || {};
    const { fields = null } = definition || {};
    const finalFields = useMemo(
        () => (fields !== null ? [...fields, getScreenExtraField(intl)] : null),
        [fields],
    );
    return { ...definition, fields: finalFields };
};

export const useScreenData = () => {
    const { data } = useScreen() || {};
    return data;
};

export const useScreenRenderContext = () => {
    const { renderContext = 'view' } = useScreen() || {};

    const isPlaceholder = renderContext === 'placeholder';
    const isPreview = renderContext === 'preview';
    const isEdit = renderContext === 'edit';
    const isView = renderContext === 'view';
    const isStatic = renderContext === 'static';
    const isCapture = renderContext === 'capture';

    return {
        renderContext,
        isPlaceholder,
        isPreview,
        isEdit,
        isView: isView || isStatic || isCapture,
        isStatic,
        isCapture,
    };
};

export const useScreenState = () => {
    const { screenState } = useScreen() || {};
    return screenState;
};

interface ScreenProviderProps {
    children: React.ReactNode;
    data?: ScreenComponent;
    definition?: ScreenDefinition;
    renderContext?: RenderContext;
    screenState?: string;
}

export function ScreenProvider(
    { data = null, definition = null, renderContext = null, screenState = null, children },
) {
    const {
        data: previousData = null,
        definition: previousDefinition = null,
        renderContext: previousContext = null,
        screenState: previousScreenState = null,
    } = useScreen() || {};

    const finalData = data || previousData || null;

    const { type = null } = finalData || {};
    const screensManager = useScreensManager();
    const contextDefinition = screensManager !== null ? screensManager.getDefinition(type) : null;
    const finalDefinition = definition || contextDefinition || previousDefinition;

    const finalRenderContext = renderContext || previousContext || 'view';
    const finalScreenState = screenState || previousScreenState || null;

    const value = useMemo(
        () => ({
            data: finalData,
            definition: finalDefinition,
            renderContext: finalRenderContext,
            screenState: finalScreenState,
        }),
        [finalData, finalDefinition, finalRenderContext, finalScreenState],
    );
    return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
}

