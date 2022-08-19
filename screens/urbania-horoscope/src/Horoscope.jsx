/* eslint-disable react/jsx-props-no-spreading */
import { useSpring, useSprings } from '@react-spring/core';
import { animated } from '@react-spring/web';
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
import { useTrackScreenEvent, useLongPress, useYeah } from '@micromag/core/hooks';
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

    const onOpenSignsGrid = useCallback(() => {
        setShowSignsGrid(true);
        // signSpringApi.start(() => ({
        //     opacity: 1,
        // }));
        // backdropSpringApi.start(() => ({
        //     opacity: 1,
        // }));
        disableInteraction();
        trackScreenEvent('open');
    }, [disableInteraction, trackScreenEvent]);

    const onCloseSignsGrid = useCallback(() => {
        setShowSignsGrid(false);
        // signSpringApi.start(() => ({
        //     opacity: 0,
        // }));
        enableInteraction();
        trackScreenEvent('close');
    }, [showSignsGrid, setShowSignsGrid, enableInteraction]);

    const onSelectSign = useCallback(
        (signId) => {
            setSelectedSign(signId);
            trackScreenEvent(`open_sign_${signId}`);
        },
        [setSelectedSign, trackScreenEvent],
    );

    const onCloseSign = useCallback(() => {
        setSelectedSign(null);
        trackScreenEvent('close_sign');
    }, [setSelectedSign, trackScreenEvent]);

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

    const headerStyles = useYeah(
        showSignsGrid,
        (p) => ({
            transform: `translateY(${-100 * p}%)`,
            opacity: 1 - p,
            boxShadow: `0 0 ${5 * p}rem ${-2 * p}rem black`,
        }),
        {
            config: {
                tension: 400,
                friction: 25,
            },
        },
    );
    const signsStyles = signs.map((s, i) =>
        useYeah(
            showSignsGrid,
            (p) => ({
                transform: `translateY(${5 * (1 - p)}rem)`,
                opacity: p,
                pointerEvents: p < 0.75 ? 'none' : 'auto',
            }),
            {
                delay: 40 * i,
                config: {
                    tension: 300,
                    friction: 22,
                },
            },
        ),
    );
    const backdropStyles = useYeah(
        showSignsGrid,
        (p) => ({
            opacity: p,
            backdropFilter: `blur(${0.5 * p}rem)`,
        }),
        {
            config: {
                tension: 100,
                friction: 25,
            },
        },
    );

    const [showModal, setShowModal] = useState(false);
    const modalStyles = useYeah(
        showModal,
        (p) => ({
            opacity: p,
            transform: `translateY(${5 * (1 - p)}rem)`,
            pointerEvents: p < 0.75 ? 'none' : 'auto',
        }),
        {
            config: { tension: 300, friction: 20 },
        },
    );

    const onLongPressStart = useCallback((e, id) => {
        const foundSign = signs.find(s => s.id === id);
        setSelectedSign(foundSign);
        setShowModal(0.4);
    }, [signs, showModal, setSelectedSign, setShowModal]);

    const onLongPress = useCallback((e, id) => {
        setShowModal(true);
        trackScreenEvent(`open_sign_${id}`);
    }, [showModal, setShowModal, trackScreenEvent]);

    const onLongPressEnd = useCallback(() => {
        setShowModal(false);
    }, [showModal, setShowModal]);

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
                        <div className={styles.signsGridContainer}>
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
