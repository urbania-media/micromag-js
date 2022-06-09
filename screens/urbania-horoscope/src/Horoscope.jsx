/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useScreenState,
    useViewerContext,
    useViewerInteraction,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import SignsGrid from './SignsGrid';
import signsList from './signs';

import styles from './styles.module.scss';

import Astrologie from './images/astrologie-text.svg';

const propTypes = {
    defaultSigns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
    signs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            word: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    title: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    author: MicromagPropTypes.authorElement,
    button: MicromagPropTypes.buttonElement,
    signSubtitle: MicromagPropTypes.headingElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    popupBackground: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    defaultSigns: signsList,
    signs: null,
    title: null,
    description: null,
    author: null,
    button: null,
    signSubtitle: null,
    spacing: 20,
    background: null,
    popupBackground: null,
    current: true,
    active: true,
    type: 'horoscope',
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const Horoscope = ({
    defaultSigns,
    signs: signsValue,
    title,
    description,
    author,
    button,
    signSubtitle,
    spacing,
    background,
    popupBackground,
    current,
    active,
    transitions,
    transitionStagger,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
    const [hasPopup, setHasPopup] = useState(false);
    const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const signs = useMemo(
        () =>
            defaultSigns.map((defaultSign, index) => ({
                ...(signsValue !== null
                    ? signsValue.find(({ id: signValueId }) => signValueId === defaultSign.id) ||
                      signsValue[index]
                    : null),
                ...defaultSign,
            })),
        [],
    );

    const [currentSign, setCurrentSign] = useState(null);

    const openPopup = useCallback(() => {
        setHasPopup(true);
        disableInteraction();
        trackScreenEvent('open');
    }, [hasPopup, setHasPopup, disableInteraction, trackScreenEvent]);

    const closePopup = useCallback(() => {
        setHasPopup(false);
        enableInteraction();
        trackScreenEvent('close');
    }, [hasPopup, setHasPopup, enableInteraction]);

    const onClickSign = useCallback(
        (signId) => {
            setCurrentSign(signId);
            trackScreenEvent(`open_sign_${signId}`);
        },
        [setCurrentSign, trackScreenEvent],
    );

    const onClickCloseSign = useCallback(() => {
        setCurrentSign(null);
        trackScreenEvent('close_sign');
    }, [setCurrentSign, trackScreenEvent]);

    const screenState = useScreenState();

    useEffect(() => {
        if (screenState === 'intro') {
            setHasPopup(false);
        }
        if (screenState === 'grid') {
            setHasPopup(true);
            setCurrentSign(null);
        }
        if (screenState !== null && screenState.includes('signs')) {
            const index = screenState.split('.').pop();
            setHasPopup(true);
            setCurrentSign(signs[index].id);
        }
    }, [screenState]);

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasButton = isTextFilled(button);

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);

    // Create elements
    const items = [
        <div key="title" className={styles.headerContainer}>
            {/* TITLE */}
            <ScreenElement
                // emptyLabel={
                //     <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                // }
                emptyClassName={styles.emptyText}
                // isEmpty={!hasTitle}
            >
                {hasTitle ? (
                    <Heading className={styles.title} {...title} />
                ) : (
                    <img src={Astrologie} alt="" className={styles.titleImage} />
                )}
            </ScreenElement>

            {/* DESCRIPTION */}
            <ScreenElement
                key="description"
                emptyLabel={
                    <FormattedMessage defaultMessage="Description" description="Text placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasDescription}
            >
                {hasDescription ? <Text className={styles.description} {...description} /> : null}
            </ScreenElement>
        </div>,

        // BUTTON
        <ScreenElement
            key="button"
            emptyLabel={
                <FormattedMessage defaultMessage="Button" description="Button placeholder" />
            }
            emptyClassName={styles.emptyText}
            isEmpty={!hasButton}
        >
            {hasButton ? (
                <Button
                    className={styles.button}
                    type="button"
                    separateBorder
                    onClick={openPopup}
                    {...button}
                >
                    <Text className={styles.buttonLabel} {...button} inline />
                </Button>
            ) : null}
        </ScreenElement>,
        // <TransitionGroup>
        //     {hasPopup || isPlaceholder ? (
        //         <CSSTransition key="grid" classNames={styles} timeout={500}>
        //             <SignsGrid
        //                 width={width}
        //                 height={height}
        //                 className={styles.signsGrid}
        //                 closeButton={closePopup}
        //                 background={popupBackground}
        //                 signs={signs}
        //                 signSubtitle={signSubtitle}
        //                 activeSignId={activeSignId}
        //                 setCurrentSign={setCurrentSign}
        //             />
        //         </CSSTransition>
        //     ) : null}
        // </TransitionGroup>,
    ].filter((el) => el !== null);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mediaRef}
                />
            ) : null}
            <Container width={width} height={height}>
                <Scroll disabled={scrollingDisabled} verticalAlign="middle">
                    <Layout
                        className={styles.layout}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                      paddingBottom:
                                          (!isPreview ? viewerBottomHeight : 0) + spacing,
                                  }
                                : null
                        }
                        height={height * 0.8}
                    >
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={transitionDisabled}
                            playing={transitionPlaying}
                        >
                            {items}
                        </TransitionsStagger>
                    </Layout>
                    <TransitionGroup>
                        {hasPopup || isPlaceholder ? (
                            <CSSTransition key="grid" classNames={styles} timeout={500}>
                                <SignsGrid
                                    width={width}
                                    height={height}
                                    className={styles.signsGrid}
                                    author={author}
                                    closeButton={closePopup}
                                    background={popupBackground}
                                    muted={muted}
                                    mediaRef={mediaRef}
                                    signs={signs}
                                    signSubtitle={signSubtitle}
                                    currentSign={currentSign}
                                    onClickSign={onClickSign}
                                    onClickClose={onClickCloseSign}
                                    transitionDisabled={transitionDisabled}
                                />
                            </CSSTransition>
                        ) : null}
                    </TransitionGroup>
                </Scroll>
            </Container>
        </div>
    );
};

Horoscope.propTypes = propTypes;
Horoscope.defaultProps = defaultProps;

export default React.memo(Horoscope);
