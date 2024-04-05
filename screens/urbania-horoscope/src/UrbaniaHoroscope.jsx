/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
// import FocusLock from 'react-focus-lock';
import { FormattedMessage, useIntl } from 'react-intl';

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
import { useTrackScreenEvent, useDragProgress } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Keypad from '@micromag/element-keypad';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Author from '@micromag/element-urbania-author';

import signsList from './data/signs';
import SignCard from './partials/SignCard';
import SignModal from './partials/SignModal';

import styles from './urbania-horoscope.module.scss';

import Astrologie from './images/astrologie-text.svg';

const stopDragEventsPropagation = {
    onTouchMove: (e) => e.stopPropagation(),
    onTouchStart: (e) => e.stopPropagation(),
    onTouchEnd: (e) => e.stopPropagation(),
    onPointerMove: (e) => e.stopPropagation(),
    onPointerUp: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
};

const mouseBlocker = {
    ...stopDragEventsPropagation,
    onClick: (e) => e.stopPropagation(),
    style: {
        position: 'fixed',
        zIndex: '1000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        cursor: 'default',
    },
};

const propTypes = {
    defaultSigns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: MicromagPropTypes.textElement,
        }),
    ),
    signs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: MicromagPropTypes.textElement,
            word: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    title: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    author: MicromagPropTypes.authorElement,
    button: MicromagPropTypes.button,
    signSubtitle: MicromagPropTypes.headingElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    popupBackground: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
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
    className: null,
};

const UrbaniaHoroscope = ({
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
    type,
    className,
}) => {
    const intl = useIntl();
    const trackScreenEvent = useTrackScreenEvent(type);
    const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);
    const hasAuthor = author !== null && isTextFilled(author.name);

    const signs = useMemo(
        () =>
            defaultSigns.map((defaultSign, index) => ({
                ...(signsValue !== null
                    ? signsValue.find(({ id: signValueId }) => signValueId === defaultSign.id) ||
                      signsValue[index]
                    : null),
                ...defaultSign,
            })),
        [signsValue],
    );

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasButton = isTextFilled(button);

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);

    const [showSignsGrid, setShowSignsGrid] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { video = null } = popupBackground || {};
    const { url: popupBackgroundUrl = null } = video || {};

    const onOpenSignsGrid = useCallback(() => {
        setShowSignsGrid(true);
        disableInteraction();
        trackScreenEvent('open');
    }, [disableInteraction, trackScreenEvent]);

    const onCloseSignsGrid = useCallback(() => {
        setShowSignsGrid(false);
        setShowModal(false); // can't have a modal if signs are closed
        enableInteraction();
        trackScreenEvent('close');
    }, [setShowSignsGrid, setShowModal, enableInteraction, trackScreenEvent]);

    const onSelectSign = useCallback(
        (e, id) => {
            e.stopPropagation();
            const foundSignIndex = signs.findIndex((s) => s.id === id);
            setSelectedSign(foundSignIndex);
            setShowModal(true);
            trackScreenEvent('select_sign', signs[foundSignIndex]);
        },
        [signs, setSelectedSign, trackScreenEvent],
    );

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        trackScreenEvent('close_sign');
    }, [setShowModal, trackScreenEvent]);

    const computeSignsGridProgress = useCallback(
        ({ active: dragActive, movement: [, my], velocity: [, vy] }) => {
            const progress = Math.max(0, my) / (window.innerHeight * 0.8);
            const reachedThreshold = vy > 0.3 || Math.abs(progress) > 0.3;
            if (!dragActive) {
                if (reachedThreshold) {
                    onCloseSignsGrid();
                }
                return reachedThreshold ? 0 : 1;
            }
            return 1 - progress;
        },
        [onOpenSignsGrid, onCloseSignsGrid],
    );

    const { bind: bindSignsDrag, progress: showSignsGridProgress } = useDragProgress({
        disabled: !isView,
        progress: showSignsGrid ? 1 : 0,
        computeProgress: computeSignsGridProgress,
        springParams: { config: { tension: 300, friction: 30 } },
        dragOptions: {
            pointer: {
                keys: false,
            },
        },
    });

    const computeModalProgress = useCallback(
        ({ active: dragActive, movement: [, my], velocity: [, vy] }) => {
            const damper = 0.5;
            const p = Math.max(0, my) / window.innerHeight;
            const progress = p * damper;
            const reachedThreshold = vy > 0.3 || Math.abs(p) > 0.3;

            if (!dragActive) {
                if (reachedThreshold) {
                    onCloseModal();
                }
                return reachedThreshold ? 0 : 1;
            }

            return 1 - progress;
        },
        [showModal, onCloseModal],
    );

    const { bind: bindModalDrag, progress: showModalProgress } = useDragProgress({
        disabled: !isView,
        progress: showModal ? 1 : 0,
        computeProgress: computeModalProgress,
        springParams: { config: { tension: 300, friction: 30 } },
        dragOptions: {
            pointer: {
                keys: false,
            },
        },
    });

    const getHeaderStyles = (spring) => ({
        transform: spring.to((p) => `translateY(${-100 * p * (1 - p)}%)`),
        opacity: spring.to((p) => (p > 0.25 ? 1 - p : 1)),
    });
    const getSignsContainerStyles = (spring) => ({
        opacity: spring,
        pointerEvents: spring.to((p) => (p < 0.25 ? 'none' : 'auto')),
    });
    const getSignStyles = (spring) => ({
        opacity: spring,
        transform: spring.to(
            (p) => `translateY(${3 * (1 - p) ** 5}rem) scale(${1 - 0.25 * (1 - p)})`,
        ),
    });
    const getAuthorStyles = (spring) => ({
        transform: spring.to((p) => `translateY(${2 * (1 - p)}rem)`),
        opacity: spring,
    });
    const getBackdropStyles = (spring) => ({
        opacity: spring,
    });
    const getModalStyles = (spring) => ({
        transform: spring.to((p) => `translateY(${100 * (1 - (p < 0.2 ? 0.1 * p + p : p))}%)`),
        pointerEvents: spring.to((p) => (p < 0.1 ? 'none' : 'auto')),
    });

    // for editor purposes
    const screenState = useScreenState();

    useEffect(() => {
        setShowSignsGrid(false);

        if (screenState === null || screenState === 'intro') {
            setShowSignsGrid(false);
            setShowModal(false);
        }
        if (screenState === 'grid') {
            setShowSignsGrid(true);
            setSelectedSign(null);
            setShowModal(false);
        }
        if (screenState !== null && screenState.includes('signs')) {
            const index = screenState.split('.').pop();
            setShowSignsGrid(true);
            setShowModal(true);
            setSelectedSign(index);
        }
    }, [screenState, setShowSignsGrid, setShowModal, setSelectedSign]);

    useEffect(() => {
        const keyup = (e) => {
            if (e.key === 'Escape') {
                if (showModal) {
                    onCloseModal();
                    return;
                }
                if (showSignsGrid) {
                    onCloseSignsGrid();
                }
            }
        };
        document.addEventListener('keyup', keyup);
        return () => {
            document.removeEventListener('keyup', keyup);
        };
    }, [showModal, onCloseModal, showSignsGrid, onCloseSignsGrid]);

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
            {...(showSignsGrid ? stopDragEventsPropagation : null)}
        >
            {!isView ? <div {...mouseBlocker} /> : null}
            <Container width={width} height={height} className={styles.content}>
                <Layout
                    className={styles.layout}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) + spacing,
                              }
                            : null
                    }
                    height={height * 0.8}
                >
                    {isPlaceholder ? (
                        <div className={styles.placeholderGrid}>
                            {[...Array(12).keys()].map(() => (
                                <div className={styles.placeholderItem} />
                            ))}
                        </div>
                    ) : null}

                    <animated.div
                        className={styles.headerContainer}
                        style={getHeaderStyles(showSignsGridProgress)}
                    >
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
                    </animated.div>

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
                                onClick={onOpenSignsGrid}
                                withoutBootstrapStyles
                                focusable={current && !isPreview && !isPlaceholder}
                                {...button}
                            >
                                <Text className={styles.buttonLabel} {...button} inline />
                            </Button>
                        ) : null}
                    </ScreenElement>

                    {isView && !isPlaceholder ? (
                        <animated.div
                            className={styles.header}
                            style={{
                                opacity: showSignsGridProgress,
                                pointerEvents: showSignsGridProgress.to((p) =>
                                    p < 0.25 ? 'none' : 'auto',
                                ),
                            }}
                        >
                            <div className={styles.buttons}>
                                <Button
                                    className={styles.close}
                                    onClick={onCloseSignsGrid}
                                    label={intl.formatMessage({
                                        defaultMessage: 'Close',
                                        description: 'Button label',
                                    })}
                                    iconPosition="right"
                                    icon={
                                        <svg
                                            className={styles.closeIcon}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="16"
                                            viewBox="0 0 10 16"
                                            fill="currentColor"
                                        >
                                            <polygon points="9.95 4.11 8.89 3.05 5 6.94 1.11 3.05 0.05 4.11 3.94 8 0.05 11.89 1.11 12.95 5 9.06 8.89 12.95 9.95 11.89 6.06 8 9.95 4.11" />
                                        </svg>
                                    }
                                    focusable={
                                        !isPreview && !isPlaceholder && (showSignsGrid || showModal)
                                    }
                                    withoutStyle
                                />
                            </div>
                        </animated.div>
                    ) : null}

                    {!isPlaceholder ? (
                        <animated.div
                            className={styles.signsGridContainer}
                            style={getSignsContainerStyles(showSignsGridProgress)}
                            {...bindSignsDrag()}
                        >
                            <Keypad
                                columns={3}
                                spacing={5}
                                items={signs.map((sign) => {
                                    const { id = null } = sign || {};
                                    return (
                                        <animated.div
                                            key={id}
                                            className={styles.sign}
                                            style={getSignStyles(showSignsGridProgress)}
                                        >
                                            <SignCard
                                                key={id}
                                                sign={sign}
                                                focusable={
                                                    !isPreview &&
                                                    !isPlaceholder &&
                                                    showSignsGrid &&
                                                    !showModal
                                                }
                                                onClick={(e) => onSelectSign(e, id)}
                                            />
                                        </animated.div>
                                    );
                                })}
                            />

                            <ScreenElement
                                key="author"
                                emptyLabel={
                                    <FormattedMessage
                                        defaultMessage="Author"
                                        description="Author placeholder"
                                    />
                                }
                                emptyClassName={styles.emptyText}
                                isEmpty={!hasAuthor}
                            >
                                {hasAuthor && !isPlaceholder ? (
                                    <Author
                                        author={author}
                                        className={styles.author}
                                        collaboratorClassName={styles.collaborator}
                                        backgroundClassName={styles.authorBackground}
                                        shouldLoad={mediaShouldLoad}
                                        style={getAuthorStyles(showSignsGridProgress)}
                                    />
                                ) : null}
                            </ScreenElement>
                        </animated.div>
                    ) : null}

                    {/* TODO: figure out a way to use focus-lock with animated div */}
                    <animated.div
                        className={styles.modal}
                        style={getModalStyles(showModalProgress)}
                        {...bindModalDrag()}
                    >
                        <SignModal
                            width={width}
                            height={height}
                            sign={signs[selectedSign]}
                            subtitle={signSubtitle}
                            focusable={!isPreview && !isPlaceholder && showModal}
                            onClick={onCloseModal}
                        />
                    </animated.div>

                    {!isPlaceholder ? (
                        <animated.div
                            className={styles.backdrop}
                            style={getBackdropStyles(showSignsGridProgress)}
                        >
                            {popupBackgroundUrl !== null ? (
                                <video
                                    className={styles.videoBackdrop}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src={popupBackgroundUrl} type="video/mp4" />
                                </video>
                            ) : null}
                        </animated.div>
                    ) : null}
                </Layout>
            </Container>
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
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

UrbaniaHoroscope.propTypes = propTypes;
UrbaniaHoroscope.defaultProps = defaultProps;

export default UrbaniaHoroscope;
