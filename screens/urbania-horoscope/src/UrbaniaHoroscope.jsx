/* eslint-disable react/jsx-props-no-spreading */
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
import { useTrackScreenEvent, useProgressTransition } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Author from '@micromag/element-urbania-author';

import signsList from './data/signs';
import SignCard from './partials/SignCard';
import SignModal from './partials/SignModal';

import styles from './urbania-horoscope.module.scss';

import Astrologie from './images/astrologie-text.svg';

const SPRING_CONFIG_TIGHT = { tension: 300, friction: 35 }; // tight

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
    const [showSignsGrid, setShowSignsGrid] = useState(false);
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
        [],
    );

    const [selectedSign, setSelectedSign] = useState(null);

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasButton = isTextFilled(button);

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

    const onSelectSign = useCallback(
        (e, id) => {
            e.stopPropagation();
            const foundSign = signs.find((s) => s.id === id);
            setSelectedSign(foundSign);
            setShowModal(true);
        },
        [signs, setSelectedSign],
    );

    const onCloseModal = useCallback(
        (e) => {
            e.stopPropagation();
            setShowModal(0);
        },
        [setShowModal],
    );

    const [isDragging, setIsDragging] = useState(false);

    // @todo either switch to useSwipe properly or extra to some new hook?
    const onDragContent = useCallback(
        ({ active: dragActive, movement: [, my], tap, velocity: [, vy] }) => {
            if (!isView || tap || showModal) return;

            const progress = Math.max(0, my) / height;
            const reachedThreshold = vy > 0.3 || Math.abs(progress) > 0.3;

            if (!tap) {
                setShowSignsGrid(1 - progress);
                setIsDragging(true);
            }

            if (!dragActive) {
                setIsDragging(false);
                if (reachedThreshold) {
                    onCloseSignsGrid();
                } else {
                    setShowSignsGrid(1);
                }
            }
        },
        [
            onCloseSignsGrid,
            setShowSignsGrid,
            setIsDragging,
            showModal,
            selectedSign,
            isView,
            height,
        ],
    );

    const bindSignsDrag = useDrag(onDragContent, {
        axis: 'y',
        filterTaps: true,
    });

    const onDragModal = useCallback(
        ({ active: dragActive, movement: [, my], tap, velocity: [, vy] }) => {
            if (!isView) return;

            if (tap) {
                setShowModal(0);
            }

            const damper = 0.5;
            const progress = (Math.max(0, my) / height) * damper;
            const reachedThreshold = vy > 0.3 || Math.abs(progress) > 0.3;

            if (!tap) {
                setShowModal(1 - progress);
                setIsDragging(true);
            }

            if (!dragActive) {
                setIsDragging(false);
                if (reachedThreshold) {
                    setShowModal(0);
                } else {
                    setShowModal(1);
                }
            }
        },
        [setIsDragging, showModal, isView, height],
    );
    const bindModalDrag = useDrag(onDragModal, {
        axis: 'y',
        filterTaps: true,
    });

    const { styles: headerStyles = {} } = useProgressTransition({
        value: showSignsGrid,
        fn: (p) => ({
            transform: `translateY(${-100 * p * (1 - p)}%)`,
            opacity: p > 0.25 ? 1 - p : 1,
        }),
        params: {
            immediate: isDragging,
            config: SPRING_CONFIG_TIGHT,
        },
    });
    const { styles: signsContainerStyles = {} } = useProgressTransition({
        value: showSignsGrid,
        fn: (p) => ({
            opacity: p,
            pointerEvents: p < 0.25 ? 'none' : 'auto',
        }),
        params: {
            immediate: isDragging,
            config: SPRING_CONFIG_TIGHT,
        },
    });
    const { styles: signsStyles = {} } = useProgressTransition({
        value: showSignsGrid,
        fn: (p) =>
            signs.map(() => ({
                opacity: p,
                transform: `translateY(${3 * (1 - p)}rem) scale(${1 - 0.25 * (1 - p)})`,
            })),
        params: {
            immediate: isDragging,
            config: SPRING_CONFIG_TIGHT,
        },
    });
    const { styles: authorStyles = {} } = useProgressTransition({
        value: showSignsGrid,
        fn: (p) => ({
            transform: `translateY(${2 * (1 - p)}rem)`,
            opacity: p,
        }),
        params: {
            immediate: isDragging,
            config: SPRING_CONFIG_TIGHT,
        },
    });
    const { styles: backdropStyles = {} } = useProgressTransition({
        value: showSignsGrid,
        fn: (p) => ({
            opacity: p,
        }),
        params: {
            immediate: isDragging,
            config: SPRING_CONFIG_TIGHT,
        },
    });
    const { styles: modalStyles = {} } = useProgressTransition({
        value: showModal,
        fn: (p) => ({
            transform: `translateY(${100 * (1 - (p < 0.2 ? 0.1 * p + p : p))}%)`,
            pointerEvents: p < 0.1 ? 'none' : 'auto',
        }),
        params: {
            immediate: isDragging,
            config: SPRING_CONFIG_TIGHT,
        },
    });

    // for editor purposes
    const screenState = useScreenState();

    useEffect(() => {
        setShowSignsGrid(0);

        if (screenState === null || screenState === 'intro') {
            setShowSignsGrid(false);
            setShowModal(0);
        }
        if (screenState === 'grid') {
            setShowSignsGrid(true);
            setSelectedSign(null);
            setShowModal(0);
        }
        if (screenState !== null && screenState.includes('signs')) {
            const index = screenState.split('.').pop();
            setShowSignsGrid(true);
            setShowModal(1);
            setSelectedSign(signs[index]);
        }
    }, [screenState]);

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
                                onClick={onOpenSignsGrid}
                                withoutBootstrapStyles
                                {...button}
                            >
                                <Text className={styles.buttonLabel} {...button} inline />
                            </Button>
                        ) : null}
                    </ScreenElement>

                    {!isPlaceholder ? (
                        <div className={styles.header} style={signsContainerStyles}>
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
                                    withoutStyle
                                />
                            </div>
                        </div>
                    ) : null}

                    {!isPlaceholder ? (
                        <div
                            className={styles.signsGridContainer}
                            style={signsContainerStyles}
                            {...bindSignsDrag()}
                        >
                            <div className={styles.signs}>
                                {signs.map((sign, i) => {
                                    const { id = null } = sign || {};
                                    return (
                                        <div
                                            key={id}
                                            className={styles.sign}
                                            style={signsStyles[i]}
                                        >
                                            <SignCard
                                                key={id}
                                                sign={sign}
                                                onClick={(e) => onSelectSign(e, id)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

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
                                        style={authorStyles}
                                    />
                                ) : null}
                            </ScreenElement>
                        </div>
                    ) : null}

                    <div className={styles.modal} style={modalStyles} {...bindModalDrag()}>
                        <SignModal
                            width={width}
                            height={height}
                            sign={selectedSign}
                            subtitle={signSubtitle}
                            onClick={onCloseModal}
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

UrbaniaHoroscope.propTypes = propTypes;
UrbaniaHoroscope.defaultProps = defaultProps;

export default React.memo(UrbaniaHoroscope);