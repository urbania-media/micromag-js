/* eslint-disable react/no-array-index-key */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Modals, Navbar } from '@micromag/core/components';
import {
    ModalsProvider,
    PanelsProvider,
    ScreenSizeProvider,
    useRoutePush,
} from '@micromag/core/contexts';
import { useMediasParser, useParsedStory, useScreenSizeFromElement } from '@micromag/core/hooks';
import { getDeviceScreens } from '@micromag/core/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import useRouteParams from '../hooks/useRouteParams';

import EditorForm from './Form';
import EditorPreview from './Preview';
import Screens from './Screens';

import styles from '../styles/editor.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    deviceScreens: MicromagPropTypes.deviceScreens,
    viewerTheme: MicromagPropTypes.viewerTheme,
    mobileView: PropTypes.oneOf(['screens', 'preview', 'form']),
    fullscreen: PropTypes.bool,
    isTheme: PropTypes.bool,
    isCreateOpened: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    deviceScreens: getDeviceScreens(),
    viewerTheme: null,
    mobileView: 'preview',
    fullscreen: false,
    isTheme: false,
    isCreateOpened: false,
    onChange: null,
    className: null,
};

const Editor = ({
    value,
    viewerTheme,
    isTheme,
    isCreateOpened,
    deviceScreens,
    mobileView: initialMobileView,
    onChange,
    fullscreen,
    className,
}) => {
    const push = useRoutePush();
    const refScreensContainer = useRef(null);
    const { screen: screenId } = useRouteParams({ screenOnly: true });

    // Screen size
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        screens: deviceScreens,
        withoutMaxSize: true,
        withoutScale: true,
    });
    const isMobile = screenSize !== null && screenSize.screens.indexOf('medium') === -1;

    // Mobile view
    const [mobileView, setMobileView] = useState(initialMobileView);
    const onClickScreens = useCallback(() => setMobileView('screens'), [mobileView, setMobileView]);
    const onClickEdit = useCallback(() => setMobileView('form'), [setMobileView]);
    const onClickViewScreen = useCallback(() => setMobileView('preview'), [setMobileView]);

    // console.log('mobileView', screenSize, isMobile, mobileView);

    // Apply base theme values to it's own components
    const { background = null, colors = null, textStyles = null, boxStyles = null } = value || {};
    const baseValue = isTheme
        ? { ...value, theme: { background, colors, textStyles, boxStyles } }
        : value;
    const story = useParsedStory(baseValue);
    const { toPath: parseMediasToPath } = useMediasParser();
    const onStoryChange = useCallback(
        (newStory) => {
            const storyWithMedias = parseMediasToPath(newStory);
            if (onChange !== null) {
                onChange(storyWithMedias);
            }
        },
        [onChange, parseMediasToPath],
    );

    const clickedScreenId = useRef(null);
    const onClickScreen = useCallback(
        ({ id }) => {
            clickedScreenId.current = id;
            if (screenSize.screen) {
                setMobileView('preview');
            }
            push('screen', {
                screen: clickedScreenId.current,
            });
        },
        [screenSize.screen, push],
    );

    const onPreviewScreenChange = useCallback(
        ({ id: newScreenId }) => {
            push('screen', {
                screen: newScreenId,
            });
        },
        [push],
    );

    // Auto-scroll to current screen except when manually clicking one
    useEffect(() => {
        if (screenId === null || clickedScreenId.current === screenId) {
            return;
        }
        clickedScreenId.current = null;

        const { current: screens } = refScreensContainer;
        const items = screens.querySelectorAll(`[data-screen-id="${screenId}"]`);
        if (items !== null && items.length > 0) {
            const item = items[0];
            const cnt = item.parentNode.parentNode.parentNode;
            screens.scrollTop =
                cnt.offsetTop + item.offsetTop + item.offsetHeight / 2 - screens.clientHeight / 2;
        }
    }, [screenId]);

    // console.log('screenId', screenId);

    return (
        <ModalsProvider>
            <PanelsProvider>
                <ScreenSizeProvider size={screenSize}>
                    <div
                        className={classNames([
                            styles.container,
                            screenSize !== null
                                ? screenSize.screens.map(
                                      (screenName) => styles[`screen-${screenName}`],
                                  )
                                : null,
                            {
                                [styles.fullscreen]: fullscreen,
                                [className]: className,
                            },
                        ])}
                        ref={refContainer}
                    >
                        <Navbar theme="light" compact noWrap withoutCollapse className={styles.top}>
                            {mobileView !== 'screens' ? (
                                <Button
                                    size="sm"
                                    theme="secondary"
                                    onClick={onClickScreens}
                                    className="me-auto"
                                >
                                    <FormattedMessage
                                        defaultMessage="Screens"
                                        description="Button to show screens"
                                    />
                                </Button>
                            ) : (
                                <span />
                            )}
                            {mobileView !== 'form' ? (
                                <Button size="sm" theme="primary" onClick={onClickEdit}>
                                    <FormattedMessage
                                        defaultMessage="Edit"
                                        description="Button to edit a screen"
                                    />
                                </Button>
                            ) : null}
                            {mobileView === 'form' ? (
                                <Button size="sm" theme="primary" onClick={onClickViewScreen}>
                                    <FormattedMessage
                                        defaultMessage="View screen"
                                        description="Button to view a screen"
                                    />
                                </Button>
                            ) : null}
                        </Navbar>
                        <div className={styles.inner}>
                            <div
                                className={classNames([
                                    styles.left,
                                    {
                                        [styles.visible]: !isMobile || mobileView === 'screens',
                                    },
                                ])}
                                ref={refScreensContainer}
                            >
                                <Screens
                                    value={story}
                                    isTheme={isTheme}
                                    isCreateOpened={isCreateOpened}
                                    isParsed
                                    onChange={onStoryChange}
                                    onClickScreen={onClickScreen}
                                    isVertical={!isMobile}
                                    className={styles.inner}
                                    isTree
                                />
                            </div>
                            <div
                                className={classNames([
                                    styles.center,
                                    {
                                        [styles.visible]: !isMobile || mobileView === 'preview',
                                    },
                                ])}
                            >
                                <EditorPreview
                                    value={story}
                                    isTheme={isTheme}
                                    viewerTheme={viewerTheme}
                                    className={styles.preview}
                                    onScreenChange={onPreviewScreenChange}
                                    onChange={onStoryChange}
                                />
                            </div>
                            <div
                                className={classNames([
                                    styles.right,
                                    {
                                        [styles.visible]: !isMobile || mobileView === 'form',
                                    },
                                ])}
                            >
                                <EditorForm
                                    key={screenId}
                                    value={story}
                                    isTheme={isTheme}
                                    onChange={onStoryChange}
                                    className={styles.inner}
                                />
                            </div>
                        </div>
                        <Modals />
                    </div>
                </ScreenSizeProvider>
            </PanelsProvider>
        </ModalsProvider>
    );
};

Editor.propTypes = propTypes;
Editor.defaultProps = defaultProps;

export default Editor;
