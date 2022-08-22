/* eslint-disable react/jsx-props-no-spreading */
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useScreenState,
    useViewerContext,
    useViewerInteraction,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useTrackScreenEvent, useTransitionStyles } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';

import SignCard from './SignCard';
import SignModal from './SignModal';
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
    // transitions: MicromagPropTypes.transitions,
    // transitionStagger: PropTypes.number,
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
    // transitions: null,
    // transitionStagger: 100,
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
    // transitions,
    // transitionStagger,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
    const [showSignsGrid, setShowSignsGrid] = useState(false);
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

    const [selectedSign, setSelectedSign] = useState(null);
    // const onSelectSign = useCallback(
    //     (signId) => {
    //         setSelectedSign(signId);
    //         trackScreenEvent(`open_sign_${signId}`);
    //     },
    //     [setSelectedSign, trackScreenEvent],
    // );

    // const onCloseSign = useCallback(() => {
    //     setSelectedSign(null);
    //     trackScreenEvent('close_sign');
    // }, [setSelectedSign, trackScreenEvent]);

    // @todo when viewing in editor?
    const screenState = useScreenState();

    useEffect(() => {
        if (screenState === 'intro') {
            setShowSignsGrid(false);
        }
        if (screenState === 'grid') {
            setShowSignsGrid(true);
            setSelectedSign(null);
        }
        if (screenState !== null && screenState.includes('signs')) {
            const index = screenState.split('.').pop();
            setShowSignsGrid(true);
            setSelectedSign(signs[index].id);
        }
    }, [screenState]);

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasButton = isTextFilled(button);

    // const transitionPlaying = current;
    // const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    // const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);

    const [showModal, setShowModal] = useState(false);

    const onOpenSignsGrid = useCallback(() => {
        setShowSignsGrid(true);
        disableInteraction();
        trackScreenEvent('open');
    }, [disableInteraction, trackScreenEvent]);

    const onCloseSignsGrid = useCallback(() => {
        setShowSignsGrid(false);
        setShowModal(0); // can't have a modal if signs are closed
        enableInteraction();
        trackScreenEvent('close');
    }, [showSignsGrid, setShowSignsGrid, setShowModal, enableInteraction]);

    const onLongPressStart = useCallback(
        (e, id) => {
            const foundSign = signs.find((s) => s.id === id);
            setSelectedSign(foundSign);
            setShowModal(0.25);
        },
        [signs, showModal, setSelectedSign],
    );

    const onLongPress = useCallback(
        (e, id) => {
            setShowModal(1);
            trackScreenEvent(`open_sign_${id}`);
        },
        [showModal, setShowModal, trackScreenEvent],
    );

    const onLongPressEnd = useCallback(() => {
        setShowModal(false);
    }, [showModal, setShowModal]);

    const [isDragging, setIsDragging] = useState(false);

    const onDragContent = useCallback(
        ({ active: dragActive, event, movement: [mx, my], tap, velocity: [vx, vy] }) => {
            event.preventDefault();
            event.stopPropagation();

            if (!isView) {
                return;
            }
            // what about reachedBounds ???

            // handle single tap on screen
            if (tap) {
                // onTap();
                return;
            }

            const progress = Math.max(0, my) / height; // drag "ratio": how much of the screen width has been swiped?
            // const forwards = my < 0; // true if swiping to left (to navigate forwards)
            const reachedThreshold = vy > 0.3 || Math.abs(progress) > 0.3;

            // it's not a tap, it's a drag event
            if (!tap) {
                // onDrag
                // pass all the props defined above to this function so that it moves everything accordingly
                // onDrag();
                setShowSignsGrid(1 - progress);
                // setShowModal(showModal - progress/100);
                setIsDragging(true);
            }

            // user has released drag
            if (!dragActive) {
                setIsDragging(false);
                // onRelease();

                // drag/swipe has reached the activation threshold and hasn't yet reached the beginning/end of the stack
                // if (reachedThreshold) {
                if (reachedThreshold) {
                    // onReachedThreshold();
                    onCloseSignsGrid();
                } else {
                    setShowSignsGrid(1);
                    setShowModal(selectedSign !== null);
                    // transition back to the current index
                    // onReset();
                }
            }
        },
        [onCloseSignsGrid, setShowSignsGrid, setIsDragging, showModal, selectedSign, isView, height],
    );

    const bindSignsDrag = useDrag(onDragContent, {
        filterTaps: true,
    });

    const headerStyles = useTransitionStyles(
        showSignsGrid,
        (p) => ({
            transform: `translateY(${-100 * p * (1 - p)}%)`,
            opacity: p > 0.25 ? 1 - p : 1,
            boxShadow: `0 0 ${5 * p}rem ${0.5 * p}rem black`,
        }),
        {
            immediate: isDragging,
            config: {
                tension: 300,
                friction: 30,
            },
        },
    );
    const signsContainerStyles = useTransitionStyles(
        showSignsGrid,
        (p) => ({
            opacity: p,
            pointerEvents: p < 0.25 ? 'none' : 'auto',
        }),
        {
            immediate: isDragging,
            // delay: 100,
            config: {
                tension: 300,
                friction: 30,
            },
        },
    );
    const signsStyles = signs.map((s, i) =>
        useTransitionStyles(
            showSignsGrid,
            (p) => ({
                transform: `translateY(${2 * (1 - p)}rem)`,
            }),
            {
                immediate: isDragging,
                delay: !isDragging ? 25 * i : 0,
                config: {
                    tension: 300,
                    friction: 30,
                },
            },
        ),
    );
    const backdropStyles = useTransitionStyles(
        showSignsGrid,
        (p) => ({
            opacity: p,
            backdropFilter: `blur(${0.5 * p}rem)`,
        }),
        {
            immediate: isDragging,
            config: {
                tension: 200,
                friction: 30,
            },
        },
    );

    const modalStyles = useTransitionStyles(
        showModal,
        (p) => ({
            transform: `translateY(${100 * (1 - p)}%)`,
            pointerEvents: p < 0.75 ? 'none' : 'auto',
        }),
        {
            config: {
                tension: 250,
                friction: 20,
            },
        },
    );

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
                <Layout
                    className={styles.layout}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom: (!isPreview ? viewerBottomHeight : 0) + spacing,
                              }
                            : null
                    }
                    height={height * 0.8}
                >
                    <div className={styles.headerContainer} style={headerStyles}>
                        <ScreenElement emptyClassName={styles.emptyText}>
                            {hasTitle ? (
                                <Heading className={styles.title} {...title} />
                            ) : (
                                <img src={Astrologie} alt="" className={styles.titleImage} />
                            )}
                        </ScreenElement>

                        <ScreenElement
                            key="description"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Description"
                                    description="Text placeholder"
                                />
                            }
                            emptyClassName={styles.emptyText}
                            isEmpty={!hasDescription}
                        >
                            {hasDescription ? (
                                <Text className={styles.description} {...description} />
                            ) : null}
                        </ScreenElement>
                    </div>

                    <ScreenElement
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Button"
                                description="Button placeholder"
                            />
                        }
                        emptyClassName={styles.emptyText}
                        isEmpty={!hasButton}
                    >
                        {hasButton ? (
                            <Button
                                className={styles.button}
                                type="button"
                                separateBorder
                                onClick={onOpenSignsGrid}
                                {...button}
                            >
                                <Text className={styles.buttonLabel} {...button} inline />
                            </Button>
                        ) : null}
                    </ScreenElement>

                    {!isPlaceholder ? (
                        <div
                            className={styles.signsGridContainer}
                            style={signsContainerStyles}
                            {...bindSignsDrag()}
                        >
                            {signs.map((sign, i) => {
                                const { id = null } = sign || {};
                                return (
                                    <div className={styles.sign} style={signsStyles[i]}>
                                        <SignCard
                                            key={id}
                                            sign={sign}
                                            onLongPress={onLongPress}
                                            onLongPressStart={onLongPressStart}
                                            onLongPressEnd={onLongPressEnd}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                    <div className={styles.modal} style={modalStyles}>
                        <SignModal
                            width={width}
                            height={height}
                            sign={selectedSign}
                            subtitle={signSubtitle}
                            // transitionDisabled={transitionDisabled}
                        />
                    </div>

                    {!isPlaceholder ? (
                        <div className={styles.backdrop} style={backdropStyles} />
                    ) : null}
                </Layout>
            </Container>
        </div>
    );
};

Horoscope.propTypes = propTypes;
Horoscope.defaultProps = defaultProps;

export default React.memo(Horoscope);
