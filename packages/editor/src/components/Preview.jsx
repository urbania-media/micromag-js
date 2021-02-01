/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route } from 'react-router';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver/* , useParsedStory */} from '@micromag/core/hooks';
import { useScreenSize, useRoutes } from '@micromag/core/contexts';
import { Viewer } from '@micromag/viewer';

import useThemeValue from '../hooks/useThemeValue';
import DevicesMenu from './menus/Devices';

import styles from '../styles/preview.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    devices: MicromagPropTypes.devices,
    device: PropTypes.string,
    viewerTheme: MicromagPropTypes.branding,
    isTheme: PropTypes.bool,
    className: PropTypes.string,
    onScreenChange: PropTypes.func,
    withoutDevicesSizes: PropTypes.bool,
};

const defaultProps = {
    value: null,
    devices: [
        {
            id: 'mobile',
            width: 320,
            height: 500,
        },
        {
            id: 'desktop',
            width: 1200,
            height: 900,
        },
    ],
    device: null,
    viewerTheme: null,
    isTheme: false,
    className: null,
    onScreenChange: null,
    withoutDevicesSizes: false,
};

const EditorPreview = ({
    value,
    viewerTheme,
    isTheme,
    devices,
    device: initialDevice,
    className,
    onScreenChange,
    withoutDevicesSizes,
}) => {
    const routes = useRoutes();
    const { screen = null, screens = [] } = useScreenSize();
    const valueWithTheme = useThemeValue(value, isTheme);
    const valueParsed = valueWithTheme;
    // const valueParsed = useParsedStory(valueWithTheme, { withMedias: false });

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
        if (withoutDevicesSizes) {
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
    }, [device, contentRect, screen, withoutDevicesSizes]);

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
                        />
                    </div>
                ) : null}
                <div className={styles.bottom}>
                    <div className={styles.inner} ref={bottomRef}>
                        <div className={styles.preview} style={previewStyle}>
                            <Route
                                path={[routes.screen, routes.home]}
                                render={({
                                    match: {
                                        params: { screen: screenId = null },
                                    },
                                }) => (
                                    <div className={styles.viewerContainer}>
                                        <Viewer
                                            story={valueParsed}
                                            storyIsParsed
                                            screen={screenId}
                                            className={styles.story}
                                            theme={viewerTheme}
                                            interactions={null}
                                            renderContext="edit"
                                            onScreenChange={onScreenChange}
                                        />
                                    </div>
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
