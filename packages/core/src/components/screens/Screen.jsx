/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName } from '../../utils';

import { ScreenProvider, useScreenComponent } from '../../contexts';

import styles from '../../styles/screens/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.storyComponent.isRequired,
    renderContext: MicromagPropTypes.renderContext,
    screenState: PropTypes.string,
    index: PropTypes.number,
    active: PropTypes.bool,
    current: PropTypes.bool,
    component: PropTypes.node,
    components: MicromagPropTypes.components,
    className: PropTypes.string,
    mediaRef: PropTypes.func,
};

const defaultProps = {
    active: true,
    renderContext: null,
    screenState: null,
    index: null,
    current: false,
    component: null,
    components: null,
    className: null,
    mediaRef: null,
};

const Screen = ({
    screen,
    renderContext,
    screenState,
    index,
    active,
    current,
    components,
    component,
    className,
    mediaRef,
}) => {
    const { type = null } = screen || {};
    const CustomScreenComponent =
        components !== null ? getComponentFromName(type, components) || null : null;
    const ContextScreenComponent = useScreenComponent(type);
    const ScreenComponent = CustomScreenComponent || ContextScreenComponent;

    return (
        <ScreenProvider data={screen} renderContext={renderContext} screenState={screenState}>
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
                        index={index}
                        active={active}
                        current={current}
                        mediaRef={mediaRef}
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
