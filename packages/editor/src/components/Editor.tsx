import classNames from 'classnames';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { DeviceScreen, Story, ViewerTheme } from '@micromag/core';
import { Button, Modals, Navbar } from '@micromag/core/components';
import {
    EditorProvider,
    ScreenSizeProvider,
    StoryProvider,
    useRoutePush,
} from '@micromag/core/contexts';
import { useScreenSizeFromElement, useStoryParser } from '@micromag/core/hooks';
import { getDeviceScreens } from '@micromag/core/utils';

import useRouteParams from '../hooks/useRouteParams';

import EditorForm from './Form';
import EditorPreview from './Preview';
import Screens from './Screens';

import styles from '../styles/editor.module.css';

export interface EditorProps {
    value?: Story | null;
    deviceScreens?: DeviceScreen[];
    viewerTheme?: ViewerTheme | null;
    mobileView?: 'screens' | 'preview' | 'form';
    fullscreen?: boolean;
    isCreateOpened?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function Editor({
    value = null,
    viewerTheme = null,
    isCreateOpened = false,
    deviceScreens = getDeviceScreens(),
    mobileView: initialMobileView = 'preview',
    onChange = null,
    fullscreen = false,
    className = null,
}: EditorProps) {
    const push = useRoutePush();
    const screensContainerRef = useRef(null);
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
    const onClickScreens = () => setMobileView('screens');
    const onClickEdit = () => setMobileView('form');
    const onClickViewScreen = () => setMobileView('preview');

    const parser = useStoryParser();
    const story = parser.parseToViewer(value);
    const onStoryChange = (newStory) => {
        const parsedStory = parser.parseFromEditor(newStory);
        if (onChange !== null) {
            onChange(parsedStory);
        }
    };

    const clickedScreenIdRef = useRef(null);
    const onClickScreen = ({ id }) => {
        clickedScreenIdRef.current = id;
        if (screenSize.screen) {
            setMobileView('preview');
        }
        push('screen', {
            screen: clickedScreenIdRef.current,
        });
    };

    const onPreviewScreenChange = ({ id: newScreenId }) => {
        push('screen', {
            screen: newScreenId,
        });
    };

    // Auto-scroll to current screen except when manually clicking one
    useEffect(() => {
        if (screenId === null || clickedScreenIdRef.current === screenId) {
            return;
        }
        clickedScreenIdRef.current = null;

        const { current: screens } = screensContainerRef;
        const items = screens.querySelectorAll(`[data-screen-id="${screenId}"]`);
        if (items !== null && items.length > 0) {
            const item = items[0];
            const cnt = item.parentNode.parentNode.parentNode;
            screens.scrollTop =
                cnt.offsetTop + item.offsetTop + item.offsetHeight / 2 - screens.clientHeight / 2;
        }
    }, [screenId]);

    return (
        <StoryProvider story={story}>
            <EditorProvider>
                <ScreenSizeProvider size={screenSize}>
                    <div
                        className={classNames([
                            styles.container,
                            'bg-body-tertiary',
                            'text-body',
                            screenSize !== null
                                ? screenSize.screens.map(
                                      (screenName) => styles[`screen-${screenName}`],
                                  )
                                : null,
                            className,
                            {
                                [styles.fullscreen]: fullscreen,
                            },
                        ])}
                        ref={refContainer as RefObject<HTMLDivElement>}
                    >
                        <Navbar compact noWrap withoutCollapse className={styles.top}>
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
                                ref={screensContainerRef}
                            >
                                <Screens
                                    value={story}
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
                                    'bg-body-secondary',
                                    {
                                        [styles.visible]: !isMobile || mobileView === 'preview',
                                    },
                                ])}
                            >
                                <EditorPreview
                                    value={story}
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
                                    onChange={onStoryChange}
                                    className={styles.inner}
                                />
                            </div>
                        </div>
                        <Modals />
                    </div>
                </ScreenSizeProvider>
            </EditorProvider>
        </StoryProvider>
    );
}

export default Editor;
