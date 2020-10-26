/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';

const ScreenRenderContext = React.createContext({
    context: 'view',
});

export const useScreenRender = () => useContext(ScreenRenderContext);

export const useScreenRenderContext = () => {
    const { context = 'view' } = useContext(ScreenRenderContext) || {};
    return {
        context,
        isPlaceholder: context === 'placeholder',
        isPreview: context === 'preview',
        isEdit: context === 'edit',
        isView: context === 'view',
    };
};

const propTypes = {
    children: PropTypes.node.isRequired,
    context: MicromagPropTypes.renderContext,
};

const defaultProps = {
    context: null,
};

// Note: this is done to avoid excessive renders on the screens that use the context

export const ScreenRenderProvider = ({ context, children }) => {
    const { context: previousContext = null } = useScreenRender() || {};
    const value = useMemo(() => ({ context: context || previousContext || 'view' }), [
        context,
        previousContext,
    ]);
    return <ScreenRenderContext.Provider value={value}>{children}</ScreenRenderContext.Provider>;
};

ScreenRenderProvider.propTypes = propTypes;
ScreenRenderProvider.defaultProps = defaultProps;

export default ScreenRenderContext;
