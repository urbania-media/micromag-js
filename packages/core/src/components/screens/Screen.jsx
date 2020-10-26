/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../../PropTypes';
import { getComponentFromName } from '../../utils';
import { useScreenComponent } from '../../contexts/ComponentsContext';

const propTypes = {
    screen: MicromagPropTypes.storyComponent.isRequired,
    active: PropTypes.bool,
    current: PropTypes.bool,
    component: PropTypes.node,
    components: MicromagPropTypes.components,
    className: PropTypes.string,
};

const defaultProps = {
    active: false,
    current: false,
    component: null,
    components: null,
    className: null,
};

const Screen = ({ screen, active, current, components, component, className }) => {
    const { type } = screen;
    const CustomScreenComponent =
        components !== null ? getComponentFromName(type, components) || null : null;
    const ContextScreenComponent = useScreenComponent(type);
    const ScreenComponent = CustomScreenComponent || ContextScreenComponent;

    return ScreenComponent !== null ? (
        <div className={className}>
            <ScreenComponent {...screen} active={active} current={current} />
        </div>
    ) : (
        <div className={className}>{component}</div>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default React.memo(Screen);
