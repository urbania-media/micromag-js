/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { ScreenProvider, useScreenComponent, VisitorProvider } from '../../contexts';
import { PropTypes as MicromagPropTypes } from '../../lib';
import styles from '../../styles/screens/screen.module.scss';
import { getComponentFromName } from '../../utils';

const propTypes = {
    screen: MicromagPropTypes.storyComponent.isRequired,
    renderContext: MicromagPropTypes.renderContext,
    screenState: PropTypes.string,
    active: PropTypes.bool,
    current: PropTypes.bool,
    component: PropTypes.node,
    components: MicromagPropTypes.components,
    className: PropTypes.string,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    enableInteraction: PropTypes.func,
    disableInteraction: PropTypes.func,
    getMediaRef: PropTypes.func,
};

const defaultProps = {
    active: true,
    renderContext: null,
    screenState: null,
    current: false,
    component: null,
    components: null,
    className: null,
    onPrevious: null,
    onNext: null,
    enableInteraction: null,
    disableInteraction: null,
    getMediaRef: null,
};

const Screen = ({
    screen,
    renderContext,
    screenState,
    active,
    current,
    components,
    component,
    className,
    onPrevious,
    onNext,
    enableInteraction,
    disableInteraction,
    getMediaRef,
}) => {
    const { type = null } = screen || {};
    const CustomScreenComponent =
        components !== null ? getComponentFromName(type, components) || null : null;
    const ContextScreenComponent = useScreenComponent(type);
    const ScreenComponent = CustomScreenComponent || ContextScreenComponent;

    return (
        <ScreenProvider data={screen} renderContext={renderContext} screenState={screenState}>
            <VisitorProvider visitor={{ id: 'editor' }}>
                {ScreenComponent !== null ? (
                    <div
                        className={classNames([
                            styles.container,
                            {
                                [className]: className !== null,
                            },
                        ])}
                    >
                        <ScreenComponent
                            {...screen}
                            active={active}
                            current={current}
                            onPrevious={onPrevious}
                            onNext={onNext}
                            enableInteraction={enableInteraction}
                            disableInteraction={disableInteraction}
                            getMediaRef={getMediaRef}
                        />
                    </div>
                ) : (
                    <div className={className}>{component}</div>
                )}
            </VisitorProvider>
        </ScreenProvider>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default React.memo(Screen);
