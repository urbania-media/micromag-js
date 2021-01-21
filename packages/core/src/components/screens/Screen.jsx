/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName } from '../../utils';
import { ScreenProvider, useScreenComponent } from '../../contexts';

const propTypes = {
    screen: MicromagPropTypes.storyComponent.isRequired,
    renderContext: MicromagPropTypes.renderContext,
    active: PropTypes.bool,
    current: PropTypes.bool,
    component: PropTypes.node,
    components: MicromagPropTypes.components,
    className: PropTypes.string,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    onEnableInteraction: PropTypes.func,
    onDisableInteraction: PropTypes.func,
};

const defaultProps = {
    active: false,
    renderContext: null,
    current: false,
    component: null,
    components: null,
    className: null,
    onPrevious: null,
    onNext: null,
    onEnableInteraction: null,
    onDisableInteraction: null,
};

const Screen = ({
    screen,
    renderContext,
    active,
    current,
    components,
    component,
    className,
    onPrevious,
    onNext,
    onEnableInteraction,
    onDisableInteraction,
}) => {
    const { type } = screen;
    const CustomScreenComponent =
        components !== null ? getComponentFromName(type, components) || null : null;
    const ContextScreenComponent = useScreenComponent(type);
    const ScreenComponent = CustomScreenComponent || ContextScreenComponent;

    return (
        <ScreenProvider data={screen} renderContext={renderContext}>
            {ScreenComponent !== null ? (
                <div className={className}>
                    <ScreenComponent
                        {...screen}
                        active={active}
                        current={current}
                        onPrevious={onPrevious}
                        onNext={onNext}
                        onEnableInteraction={onEnableInteraction}
                        onDisableInteraction={onDisableInteraction}
                    />
                </div>
            ) : (
                <div className={className}>{component}</div>
            )}
        </ScreenProvider>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default React.memo(Screen);
