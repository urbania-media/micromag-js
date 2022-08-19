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

// import SignsGrid from './SignsGrid';
import SignCard from './SignCard';
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

    const [currentSign, setCurrentSign] = useState(null);

    // const [signsGridSpringProps, signsGridSpringApi] = useSpring(() => ({
    //     opacity: 0,
    //     // y: '5rem',
    //     config: {
    //         tension: 300,
    //         friction: 20,
    //     },
    // }));

    const [signSpringProps, signSpringApi] = useSprings(signs.length, (i) => ({
        opacity: 0,
        pointerEvents: 'none',
        // y: '5rem',
        config: {
            tension: 200,
            friction: 30,
            clamp: true
        },
    }));

    const [backdropSpringProps, backdropSpringApi] = useSpring(() => ({
        opacity: 0,
        pointerEvents: 'none',
        // y: '5rem',
        config: {
            tension: 150,
            friction: 50,
            clamp: true
        },
    }));

    // const { opacity = 0 } = signsGridSpringProps || {};

    // const signsGridStyles = {
    //     ...signsGridSpringProps,
    //     pointerEvents: opacity.to(o => o < 0.75 ? 'none' : 'auto'),
    // };

    const onOpenSignsGrid = useCallback(() => {
        signSpringApi.start(() => ({
            opacity: 1,
        }));
        backdropSpringApi.start(() => ({
            opacity: 1,
        }));
        disableInteraction();
        trackScreenEvent('open');
    }, [disableInteraction, trackScreenEvent]);

    // const onCloseSignsGrid = useCallback(() => {
    //     signSpringApi.start(() => ({
    //         opacity: 0,
    //     }));
    //     enableInteraction();
    //     trackScreenEvent('close');
    // }, [showSignsGrid, setShowSignsGrid, enableInteraction]);

    // const onSelectSign = useCallback(
    //     (signId) => {
    //         setCurrentSign(signId);
    //         trackScreenEvent(`open_sign_${signId}`);
    //     },
    //     [setCurrentSign, trackScreenEvent],
    // );

    // const onCloseSign = useCallback(() => {
    //     setCurrentSign(null);
    //     trackScreenEvent('close_sign');
    // }, [setCurrentSign, trackScreenEvent]);

    const screenState = useScreenState();

    useEffect(() => {
        if (screenState === 'intro') {
            setShowSignsGrid(false);
        }
        if (screenState === 'grid') {
            setShowSignsGrid(true);
            setCurrentSign(null);
        }
        if (screenState !== null && screenState.includes('signs')) {
            const index = screenState.split('.').pop();
            setShowSignsGrid(true);
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

    // const transitionPlaying = current;
    // const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    // const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);

    const springStyles = {
        header: useYeah(showSigns, (p) => ({
            transform: `transformY(-100 * ${p}%)`,
            opacity: p,
            boxShadow: `0 0 ${5 * p}rem ${-2 * p}rem black`,
        })),
        headerW: (p) => ({
            y: `-100 * ${p}%`,
            opacity: p,
            boxShadow: `0 0 ${5 * p}rem ${-2 * p}rem black`,
        }),
        backdrop: (p) => ({
            opacity: p,
        }),
        signs: (p) => ({
            y: -5 * p,
            opacity: p,
        }),
        button: (p) => ({
            opacity: 1 - p,
            y: `${-5 * p}%`,
        }),
    };

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
                    <div className={styles.headerContainer}>
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
                                    <animated.div
                                        className={styles.sign}
                                        style={{
                                            ...signSpringProps[i],
                                            pointerEvents: screenState === 'grid' ? 'auto' : 'none',
                                        }}
                                    >
                                        <SignCard key={id} sign={sign} />
                                    </animated.div>
                                );
                            })}
                            <animated.div className={styles.backdrop} style={backdropSpringProps} />
                            {/* <SignsGrid
                                width={width}
                                height={height}
                                className={styles.signsGrid}
                                author={author}
                                background={popupBackground}
                                muted={muted}
                                mediaRef={mediaRef}
                                signs={signs}
                                signSubtitle={signSubtitle}
                                currentSign={currentSign}
                                onClose={onCloseSignsGrid}
                                onSelectSign={onSelectSign}
                                onCloseSign={onCloseSign}
                                // transitionDisabled={transitionDisabled}
                            /> */}
                        </div>
                    ) : null}
                </Layout>
            </Container>
        </div>
    );
};

Horoscope.propTypes = propTypes;
Horoscope.defaultProps = defaultProps;

export default React.memo(Horoscope);
