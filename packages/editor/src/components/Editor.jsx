/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    ScreenSizeProvider,
    ModalsProvider,
    PanelsProvider,
    useRoutePush,
} from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { useScreenSizeFromElement } from '@micromag/core/hooks';
import { Button, Modals } from '@micromag/core/components';

import Screens from './Screens';
import EditorPreview from './Preview';
import EditorForm from './Form';

import styles from '../styles/editor.module.scss';
import messages from '../messages';

const propTypes = {
    story: MicromagPropTypes.story,
    deviceScreens: MicromagPropTypes.deviceScreens,
    mobileView: PropTypes.oneOf(['screens', 'preview', 'form']),
    fullscreen: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    deviceScreens: getDeviceScreens(),
    mobileView: 'screens',
    fullscreen: false,
    onChange: null,
    className: null,
};

const Editor = ({
    story,
    deviceScreens,
    mobileView: initialMobileView,
    onChange,
    fullscreen,
    className,
}) => {
    const push = useRoutePush();

    // Screen size
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
        it => {
            onChange(story);
            push('screen', {
                screen: it.id,
            });
        },
        [story, push],
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
                                      screenName => styles[`screen-${screenName}`],
                                  )
                                : null,
                            {
                                [styles.fullscreen]: fullscreen,
                                [className]: className,
                            },
                        ])}
                        ref={refContainer}
                    >
                        <div
                            className={classNames([
                                styles.top,
                                {
                                    [styles.hidden]: isMobile && mobileView === 'screens',
                                },
                            ])}
                        >
                            <Button
                                size="sm"
                                theme="secondary"
                                className={styles.back}
                                onClick={onClickScreens}
                            >
                                {messages.screens}
                            </Button>
                            {mobileView !== 'form' ? (
                                <Button
                                    size="sm"
                                    theme="primary"
                                    className={styles.edit}
                                    onClick={onClickEdit}
                                >
                                    {messages.edit}
                                </Button>
                            ) : null}
                            {mobileView === 'form' ? (
                                <Button
                                    size="sm"
                                    theme="primary"
                                    className={styles.edit}
                                    onClick={onClickViewScreen}
                                >
                                    {messages.viewScreen}
                                </Button>
                            ) : null}
                        </div>
                        <div className={styles.inner}>
                            <div
                                className={classNames([
                                    'bg-dark',
                                    styles.left,
                                    {
                                        [styles.visible]: !isMobile || mobileView === 'screens',
                                    },
                                ])}
                            >
                                <Screens
                                    story={story}
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
                                    story={story}
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
                                    story={story}
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
