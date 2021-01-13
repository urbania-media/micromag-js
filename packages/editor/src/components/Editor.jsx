/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useRef } from 'react';
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
import { useScreenSizeFromElement } from '@micromag/core/hooks';
import { Button, Modals, Navbar } from '@micromag/core/components';

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
    const scrollableScreensContainer = useRef(null);

    // Screen size
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        screens: deviceScreens,
    });
    const isMobile = screenSize !== null && screenSize.screens.indexOf('medium') === -1;

    // Mobile view
    const [mobileView, setMobileView] = useState(initialMobileView);
    const onClickScreens = useCallback(() => setMobileView('screens'), [mobileView, setMobileView]);
    const onClickEdit = useCallback(() => setMobileView('form'), [setMobileView]);
    const onClickViewScreen = useCallback(() => setMobileView('preview'), [setMobileView]);

    const onClickScreen = useCallback(() => {
        if (screenSize.screen) {
            setMobileView('preview');
        }
    }, [screenSize.screen]);

    const onPreviewScreenChange = useCallback(
        (it) => {
            push('screen', {
                screen: it.id,
            });

            // Auto scroll to current screen
            const { components = [] } = value;
            const screenIndex = components.findIndex((component) => component.id === it.id);
            if (screenIndex > -1) {
                const scrollable = scrollableScreensContainer.current;
                const nav = scrollable.getElementsByTagName('nav')[0];
                const li = scrollable.getElementsByTagName('li')[screenIndex];
                scrollable.scrollTop =
                    nav.offsetHeight +
                    li.offsetTop +
                    li.offsetHeight / 2 -
                    scrollable.clientHeight / 2;
            }
        },
        [value, push],
    );

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
                            ) : <span />}
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
                                ref={scrollableScreensContainer}
                            >
                                <Screens
                                    value={value}
                                    isTheme={isTheme}
                                    onChange={onChange}
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
                                    value={value}
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
                                    value={value}
                                    isTheme={isTheme}
                                    onChange={onChange}
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
