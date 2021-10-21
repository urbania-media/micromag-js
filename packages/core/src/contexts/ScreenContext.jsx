/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '../lib';
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
    const { definition } = useScreen() || {};
    const { fields } = definition || {};
    const finalFields = useMemo( () => [...fields, getScreenExtraField(intl)],[fields]);

    return {...definition, fields: finalFields};
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

const propTypes = {
    children: PropTypes.node.isRequired,
    data: MicromagPropTypes.screen,
    definition: MicromagPropTypes.screenDefinition,
    renderContext: MicromagPropTypes.renderContext,
};

const defaultProps = {
    data: null,
    definition: null,
    renderContext: null,
};

export const ScreenProvider = ({ data, definition, renderContext, children }) => {
    const {
        data: previousData = null,
        definition: previousDefinition = null,
        renderContext: previousContext = null,
    } = useScreen() || {};

    const finalData = data || previousData || null;

    const { type = null } = finalData || {};
    const screensManager = useScreensManager();
    const contextDefinition = screensManager !== null ? screensManager.getDefinition(type) : null;
    const finalDefinition = definition || contextDefinition || previousDefinition;

    const finalRenderContext = renderContext || previousContext || 'view';

    const value = useMemo(
        () => ({
            data: finalData,
            definition: finalDefinition,
            renderContext: finalRenderContext,
        }),
        [finalData, finalDefinition, finalRenderContext],
    );
    return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
};

ScreenProvider.propTypes = propTypes;
ScreenProvider.defaultProps = defaultProps;
