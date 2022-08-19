/* eslint-disable react/jsx-props-no-spreading */
import { useSpring, useSprings } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { useLongPress } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Author from '@micromag/element-urbania-author';

import SignModal from './SignModal';
import Close from './icons/Close';

import styles from './signs-grid.module.scss';

// import horoscopeBackground from './images/horoscope-background.png';

const defaultBackground = {
    // image: {
    //     type: 'image',
    //     url: horoscopeBackground,
    //     width: 2161,
    //     height: 3859,
    // },
    color: '#000F66',
};

const propTypes = {
    signs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            date: MicromagPropTypes.message,
            thumbnail: PropTypes.string,
            word: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    author: MicromagPropTypes.authorElement,
    signSubtitle: MicromagPropTypes.headingElement,
    currentSign: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitionDisabled: PropTypes.bool,
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            current: PropTypes.any,
        }),
    ]),
    muted: PropTypes.bool,
    onClose: PropTypes.func,
    onLongPress: PropTypes.func,
    onSelectSign: PropTypes.func,
    onCloseSign: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    signs: null,
    author: null,
    signSubtitle: null,
    currentSign: null,
    width: null,
    height: null,
    background: null,
    onClose: null,
    current: true,
    active: true,
    transitionDisabled: false,
    muted: false,
    mediaRef: null,
    onLongPress: null,
    onSelectSign: null,
    onCloseSign: null,
    className: null,
};

const SignsGrid = ({
    signs,
    author,
    signSubtitle,
    currentSign: currentSignId,
    width,
    height,
    background,
    onClose,
    current,
    active,
    transitionDisabled,
    muted,
    mediaRef,
    onLongPress,
    onSelectSign,
    onCloseSign,
    className,
}) => {
    const currentSign = signs.find(({ id = null }) => currentSignId === id) || null;
    const { isView, isPlaceholder, isEdit } = useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);
    const hasAuthor = author !== null && isTextFilled(author.name);

    const [modalSpringProps, modalSpringApi] = useSpring(() => ({
        // x: '0%',
        // y: '0%',
        opacity: 0,
        y: '5rem',
        config: {
            tension: 300,
            friction: 20,
        },
    }));

    const {
        bind: bindLongPress,
        // reset,
        // progress,
    } = useLongPress({
        onLongPressProgress: (progress) => {
            console.log({progress});
            // if (progress > 0.5) {
            //     modalSpringApi.start({ opacity: 1, y: '0rem' });
            // }
        },
        onLongPress: () => modalSpringApi.start({ opacity: 1, y: '0rem' }),
        // onLongPressEnd: () => {
        //     modalSpringApi.start({ opacity: 0, y: '5rem' });
        // },
        duration: 250,
    });

    // console.log({progress, p: progress ** 2 });

    // const onSignPointerDown = useCallback(
    //     (e, id) => {
    //         onSelectSign(id);
    //     },
    //     [onSelectSign],
    // );

    const { opacity } = modalSpringProps || {};
    const modalStyles = {
        ...modalSpringProps,
        pointerEvents: opacity.to(o => o < 1 ? 'none' : 'auto'),
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {!isPlaceholder ? (
                <Background
                    background={background || defaultBackground}
                    fit="cover"
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                    muted={muted}
                    mediaRef={mediaRef}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    width={width}
                    height={height}
                    className={styles.layout}
                    verticalAlign="middle"
                >
                    {!isPlaceholder ? (
                        <Button onClick={onClose} className={styles.closeButton}>
                            <Close className={styles.close} />
                        </Button>
                    ) : null}

                    <div
                        className={classNames([
                            styles.gridContainer,
                            {
                                [styles.isPlaceholder]: isPlaceholder,
                            },
                        ])}
                    >
                        {signs.map((sign, i) => {
                            const {
                                id = null,
                                thumbnail = null,
                                label = null,
                                date = null,
                            } = sign || {};
                            return (
                                <ScreenElement
                                    key={id}
                                    placeholder={
                                        <PlaceholderTitle className={styles.signPlaceholder} />
                                    }
                                    emptyLabel={
                                        <FormattedMessage
                                            defaultMessage="Horoscope sign"
                                            description="Sign placeholder"
                                        />
                                    }
                                    emptyClassName={styles.emptyText}
                                    isEmpty={!id}
                                >
                                    <Button
                                        className={styles.gridElement}
                                        // onPointerDown={onSignPointerDown}
                                        {...bindLongPress()}
                                    >
                                        {thumbnail !== null ? (
                                            <img
                                                className={styles.thumbnail}
                                                src={thumbnail}
                                                alt={id}
                                                loading="lazy"
                                            />
                                        ) : null}
                                        <div className={styles.gridText}>
                                            <h2 className={styles.signName}>
                                                {label !== null ? (
                                                    <FormattedMessage {...label} />
                                                ) : null}
                                            </h2>
                                            <p className={styles.date}>
                                                {date !== null ? (
                                                    <FormattedMessage {...date} />
                                                ) : null}
                                            </p>
                                        </div>
                                    </Button>

                                    <animated.div className={styles.modalContainer} style={modalStyles}>
                                        <SignModal
                                            width={width}
                                            height={height}
                                            className={styles.signModal}
                                            sign={sign}
                                            subtitle={signSubtitle}
                                            transitionDisabled={transitionDisabled}
                                        />
                                    </animated.div>
                                </ScreenElement>
                            );
                        })}

                        {/* Author + Collaborator credit */}
                        {currentSign === null ? (
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
                                    />
                                ) : null}
                            </ScreenElement>
                        ) : null}
                    </div>
                    {/* @todo maybe close button for the modal */}
                    {/* <Button onClick={onCloseSign} className={styles.closeButton}>
                        <Close className={styles.close} />
                    </Button> */}
                </Layout>
            </Container>
        </div>
    );
};

SignsGrid.propTypes = propTypes;
SignsGrid.defaultProps = defaultProps;

export default SignsGrid;
