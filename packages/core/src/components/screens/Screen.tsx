/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import { getComponentFromName } from '../../utils';

import { ScreenProvider, useScreenComponent } from '../../contexts';

import styles from '../../styles/screens/screen.module.css';

interface ScreenProps {
    screen: StoryComponent;
    renderContext?: RenderContext | null;
    screenState?: string | null;
    index?: number | null;
    active?: boolean;
    preload?: boolean;
    current?: boolean;
    component?: React.ReactNode | null;
    components?: Record<string, Component> | null;
    className?: string | null;
    mediaRef?: ((...args: unknown[]) => void) | null;
}

function Screen({
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
}: ScreenProps) {
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
}

export default Screen;
