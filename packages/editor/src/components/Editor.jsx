/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenSizeProvider } from '@micromag/core/contexts';
import { getDeviceScreens } from '@micromag/core/utils';
import { useScreenSizeFromElement } from '@micromag/core/hooks';
import { Button, Modals } from '@micromag/core/components';

import Screens from './Screens';
import EditorPreview from './Preview';
import EditorForm from './Form';

import styles from '../styles/editor.module.scss';
import messages from '../messages';

const propTypes = {
    value: MicromagPropTypes.story,
    deviceScreens: MicromagPropTypes.deviceScreens,
    mobileView: PropTypes.oneOf(['screens', 'preview', 'form']),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    deviceScreens: getDeviceScreens(),
    mobileView: 'screens',
    onChange: null,
    className: null,
};

const Editor = ({
    value,
    deviceScreens,
    mobileView: initialMobileView,
    onChange,
    className,
}) => {
    const history = useHistory();

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

    const onPreviewScreenChange = useCallback(it => history.push(`/${it.id}`), [history]);

    return (
        <ScreenSizeProvider size={screenSize}>
            <div
                className={classNames([
                    styles.container,
                    screenSize !== null
                        ? screenSize.screens.map(screenName => styles[`screen-${screenName}`])
                        : null,
                    {
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
                        theme="outline-primary"
                        className={styles.back}
                        onClick={onClickScreens}
                    >
                        {messages.screens}
                    </Button>
                    {mobileView !== 'form' ? (
                        <Button size="sm" className={styles.edit} onClick={onClickEdit}>
                            {messages.edit}
                        </Button>
                    ) : null}
                    {mobileView === 'form' ? (
                        <Button size="sm" className={styles.edit} onClick={onClickViewScreen}>
                            {messages.viewScreen}
                        </Button>
                    ) : null}
                </div>
                <div className={styles.inner}>
                    <div
                        className={classNames([
                            styles.left,
                            {
                                [styles.visible]: !isMobile || mobileView === 'screens',
                            },
                        ])}
                    >
                        <Screens
                            value={value}
                            onChange={onChange}
                            onClickScreen={onClickScreen}
                            isVertical={!isMobile}
                            className={styles.screens}
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
                            className={styles.preview}
                            onScreenChange={onPreviewScreenChange}
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
                        <EditorForm value={value} onChange={onChange} className={styles.form} />
                    </div>
                </div>
                <Modals />
            </div>
        </ScreenSizeProvider>
    );
};

Editor.propTypes = propTypes;
Editor.defaultProps = defaultProps;

export default Editor;
