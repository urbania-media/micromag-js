/* eslint-disable react/no-array-index-key */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { useResizeObserver, useParsedStory } from '@micromag/core/hooks';
import { Viewer } from '@micromag/viewer';
import useRouteParams from '../hooks/useRouteParams';
import useScreenStates from '../hooks/useScreenStates';
import useThemeValue from '../hooks/useThemeValue';
import styles from '../styles/preview.module.scss';
import DevicesMenu from './menus/Devices';
import ScreenStates from './partials/ScreenStates';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    devices: MicromagPropTypes.devices,
    device: PropTypes.string,
    viewerTheme: MicromagPropTypes.viewerTheme,
    isTheme: PropTypes.bool,
    className: PropTypes.string,
    onScreenChange: PropTypes.func,
    onChange: PropTypes.func,
    withoutDevicesSizes: PropTypes.bool,
};

const defaultProps = {
    value: null,
    devices: [
        {
            id: 'mobile',
            width: 320,
            height: 480,
        },
        {
            id: 'desktop',
            width: 1200,
            height: 900,
        },
    ],
    device: 'mobile',
    viewerTheme: null,
    isTheme: false,
    className: null,
    onScreenChange: null,
    onChange: null,
    withoutDevicesSizes: true,
};

const EditorPreview = ({
    value,
    viewerTheme,
    isTheme,
    devices,
    device: initialDevice,
    className,
    onScreenChange,
    onChange,
    withoutDevicesSizes,
}) => {
    const { screen: screenId = null, field: fieldParam = null } = useRouteParams();
    const { screen = null, screens = [] } = useScreenSize();
    const valueWithTheme = useThemeValue(value, isTheme);
    // const valueParsed = valueWithTheme;
    const valueParsed = useParsedStory(valueWithTheme, { withTheme: isTheme, withMedias: false });

    // Get device
    const [deviceId, setDeviceId] = useState(initialDevice || devices[0].id);
    const onClickDeviceItem = useCallback((e, it) => setDeviceId(it.id), [setDeviceId]);
    const device = useMemo(() => devices.find((it) => it.id === deviceId), [devices, deviceId]);

    // Calculate preview style
    const {
        ref: bottomRef,
        entry: { contentRect },
    } = useResizeObserver();
    const previewStyle = useMemo(() => {
        if (withoutDevicesSizes && initialDevice === null) {
            return {};
        }

        const { width: deviceWidth, height: deviceHeight } = device;
        const { width: bottomWidth = 0, height: bottomHeight = 0 } = contentRect || {};
        const maxWidth = screen === 'mobile' ? bottomWidth : deviceWidth;
        const maxHeight = screen === 'mobile' ? bottomHeight : deviceHeight;
        const { scale: previewScale } = getSizeWithinBounds(
            maxWidth,
            maxHeight,
            bottomWidth,
            bottomHeight,
        );
        return {
            width: maxWidth,
            height: maxHeight,
            transform: `scale(${previewScale}, ${previewScale})`,
        };
    }, [device, contentRect, screen, withoutDevicesSizes, initialDevice]);

    const currentScreen = useMemo(() => {
        const { components = [] } = valueParsed || {};
        return (
            (screenId !== null ? components.find(({ id }) => id === screenId) : components[0]) ||
            null
        );
    }, [valueParsed, screenId]);
    const currentScreenStates = useScreenStates(currentScreen);
    const [screenStateParam = null] =
        fieldParam !== null && currentScreenStates !== null ? fieldParam.split('/') : [];
    const currentScreenState =
        screenStateParam !== null
            ? currentScreenStates.find(({ id }) => id === screenStateParam) || null
            : null;
    const { id: screenStateId = null, repeatable = false } = currentScreenState || {};
    const currentScreenStateId =
        currentScreenState !== null && repeatable
            ? `${screenStateId}.${fieldParam.split('/').find(it => it.match(/^[0-9]+$/) !== null) || 0}`
            : screenStateId;

    return (
        <div
            className={classNames([
                styles.container,
                screens.map((screenName) => styles[`screen-${screenName}`]),
                {
                    [className]: className,
                    [styles.withoutDevicesSizes]: withoutDevicesSizes,
                },
            ])}
        >
            <div className={styles.inner}>
                {!withoutDevicesSizes ? (
                    <div className={styles.top}>
                        <DevicesMenu
                            items={devices.map((it) => ({
                                ...it,
                                active: it.id === deviceId,
                            }))}
                            onClickItem={onClickDeviceItem}
                            className={styles.devices}
                        />
                    </div>
                ) : null}
                {currentScreenStates !== null && currentScreen !== null ? (
                    <div className={classNames([styles.top, 'px-1'])}>
                        <ScreenStates
                            screen={currentScreen}
                            screenState={currentScreenStateId}
                            value={value}
                            onChange={onChange}
                        />
                    </div>
                ) : null}
                <div className={styles.bottom}>
                    <div className={styles.inner} ref={bottomRef}>
                        <div className={styles.preview} style={previewStyle}>
                            <div className={styles.viewerContainer}>
                                <Viewer
                                    story={valueParsed}
                                    storyIsParsed
                                    screen={screenId}
                                    screenState={currentScreenStateId}
                                    className={styles.story}
                                    theme={viewerTheme}
                                    interactions={null}
                                    renderContext="edit"
                                    onScreenChange={onScreenChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditorPreview.propTypes = propTypes;
EditorPreview.defaultProps = defaultProps;

export default EditorPreview;
