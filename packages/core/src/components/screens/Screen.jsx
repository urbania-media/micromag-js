/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../../PropTypes';
import getComponentFromName from '../../utils/getComponentFromName';
import { useScreensComponents } from '../../contexts/ComponentsContext';

const propTypes = {
    screen: AppPropTypes.storyComponent.isRequired,
    component: PropTypes.node,
    components: AppPropTypes.components,
    renderFormat: AppPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    component: null,
    components: null,
    renderFormat: 'view',
    className: null,
};

const Screen = ({ screen, components, component, renderFormat, className }) => {
    const { type } = screen;
    const contextComponents = useScreensComponents();
    const finalComponents = components || contextComponents;
    const ScreenComponent = getComponentFromName(type, finalComponents) || null;

    return ScreenComponent !== null ? (
        <div className={className}>
            <ScreenComponent {...screen} renderFormat={renderFormat} />
        </div>
    ) : (
        <div className={className}>{component}</div>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default React.memo(Screen);
