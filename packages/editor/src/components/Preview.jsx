/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route } from 'react-router';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';
import { useScreen, useScreens, useRoutes } from '@micromag/core/contexts';
import { ViewerWithoutRouter as Viewer } from '@micromag/viewer';

import DevicesMenu from './menus/Devices';

import styles from '../styles/preview.module.scss';

const propTypes = {
    story: MicromagPropTypes.story,
    devices: MicromagPropTypes.devices,
    device: PropTypes.string,
    className: PropTypes.string,
    onScreenChange: PropTypes.func,
};

const defaultProps = {
    story: null,
    devices: [
        {
            id: 'mobile',
            width: 320,
            height: 500,
        },
        {
            id: 'desktop',
            width: 1440,
            height: 800,
        },
    ],
    device: null,
    className: null,
    onScreenChange: null,
};

const EditorPreview = ({ story, devices, device: initialDevice, className, onScreenChange }) => {
    const routes = useRoutes();
    const screen = useScreen();
    const screens = useScreens();

    // Get device
    const [deviceId, setDeviceId] = useState(initialDevice || devices[0].id);
    const onClickDeviceItem = useCallback((e, it) => setDeviceId(it.id), [setDeviceId]);
    const device = useMemo(() => devices.find(it => it.id === deviceId), [devices, deviceId]);

    // Calculate preview style
    const {
        ref: bottomRef,
        entry: { contentRect },
    } = useResizeObserver();
    const previewStyle = useMemo(() => {
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
    }, [device, contentRect, screen]);

    return (
        <div
            className={classNames([
                styles.container,
                screens.map(screenName => styles[`screen-${screenName}`]),
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.inner}>
                <div className={styles.top}>
                    <DevicesMenu
                        items={devices.map(it => ({
                            ...it,
                            active: it.id === deviceId,
                        }))}
                        onClickItem={onClickDeviceItem}
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={styles.inner} ref={bottomRef}>
                        <div className={styles.preview} style={previewStyle}>
                            <Route
                                path={[routes.home, routes.screen]}
                                render={({
                                    match: {
                                        params: { screen: screenId = null },
                                    },
                                }) => (
                                    <Viewer
                                        story={story}
                                        screen={screenId}
                                        className={styles.story}
                                        interactions={null}
                                        renderFormat="edit"
                                        onScreenChange={onScreenChange}
                                    />
                                )}
                            />
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
