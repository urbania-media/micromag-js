/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName } from '../../utils';

import { ScreenProvider, useScreenComponent } from '../../contexts';

import styles from '../../styles/screens/screen.module.css';

const propTypes = {
    screen: MicromagPropTypes.storyComponent.isRequired,
    renderContext: MicromagPropTypes.renderContext,
    screenState: PropTypes.string,
    index: PropTypes.number,
    active: PropTypes.bool,
    preload: PropTypes.bool,
    current: PropTypes.bool,
    component: PropTypes.node,
    components: MicromagPropTypes.components,
    className: PropTypes.string,
    mediaRef: PropTypes.func,
};

const Screen = ({
    screen,
    renderContext = null,
    screenState = null,
    index = null,
    active = true,
    current = false,
    preload = true,
    components = null,
    component = null,
    className = null,
    mediaRef = null,
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
                        preload={preload}
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

export default React.memo(Screen);
