/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    ScreenSizeProvider,
    ModalsProvider,
    PanelsProvider,
    useRoutePush,
} from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { useScreenSizeFromElement, useParsedStory, useMediasParser } from '@micromag/core/hooks';
import { Button, Modals, Navbar } from '@micromag/core/components';

import useRouteParams from '../hooks/useRouteParams';
import Screens from './Screens';
import EditorPreview from './Preview';
import EditorForm from './Form';

import styles from '../styles/editor.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    deviceScreens: MicromagPropTypes.deviceScreens,
    mobileView: PropTypes.oneOf(['screens', 'preview', 'form']),
    fullscreen: PropTypes.bool,
    isTheme: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    deviceScreens: getDeviceScreens(),
    mobileView: 'preview',
    fullscreen: false,
    isTheme: false,
    onChange: null,
    className: null,
};

const Editor = ({
    value,
    isTheme,
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
    });
    const isMobile = screenSize !== null && screenSize.screens.indexOf('medium') === -1;

    // Mobile view
    const [mobileView, setMobileView] = useState(initialMobileView);
    const onClickScreens = useCallback(() => setMobileView('screens'), [mobileView, setMobileView]);
    const onClickEdit = useCallback(() => setMobileView('form'), [setMobileView]);
    const onClickViewScreen = useCallback(() => setMobileView('preview'), [setMobileView]);

    const story = useParsedStory(value);
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
        },
        [screenSize.screen],
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
                cnt.offsetTop +
                item.offsetTop +
                item.offsetHeight / 2 -
                screens.clientHeight / 2;
        }
    }, [screenId]);

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
                                    className="mr-auto"
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
                                    'bg-dark',
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
                                    onChange={onStoryChange}
                                    onClickScreen={onClickScreen}
                                    isVertical={!isMobile}
                                    className={styles.inner}
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
                                    className={styles.preview}
                                    onScreenChange={onPreviewScreenChange}
                                />
                            </div>
                            <div
                                className={classNames([
                                    'bg-dark',
                                    styles.right,
                                    {
                                        [styles.visible]: !isMobile || mobileView === 'form',
                                    },
                                ])}
                            >
                                <EditorForm
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
