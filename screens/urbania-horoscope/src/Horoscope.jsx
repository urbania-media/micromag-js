/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    // PlaceholderText,
    // PlaceholderTitle,
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Author from '@micromag/element-urbania-author';
import SignsGrid from './SignsGrid';
import Astrologie from './images/astrologie-text.svg';
import signsList from './signs';
import styles from './styles.module.scss';

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
    enableInteraction: PropTypes.func,
    disableInteraction: PropTypes.func,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
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
    enableInteraction: null,
    disableInteraction: null,
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
    enableInteraction,
    disableInteraction,
    transitions,
    transitionStagger,
    className,
}) => {
    const [hasPopup, setHasPopup] = useState(false);

    const openPopup = useCallback(() => {
        setHasPopup(true);
        disableInteraction();
    }, [hasPopup, setHasPopup, disableInteraction]);

    const closePopup = useCallback(() => {
        setHasPopup(false);
        enableInteraction();
    }, [hasPopup, setHasPopup, enableInteraction]);

    const signs = defaultSigns.map((sign, index) => ({
        ...sign,
        ...(signsValue !== null && signsValue[index] ? signsValue[index] || null : null),
    }));

    const { width, height, menuOverScreen, resolution } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasAuthor = author !== null && isTextFilled(author.name);
    const hasButton = isTextFilled(button);

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = !isPlaceholder && (current || active || !isView);

    // Create elements
    const items = [
        <div className={styles.headerContainer}>
            {/* TITLE */}
            <ScreenElement
                key="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasTitle}
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

            {/* AUTHOR */}
            <ScreenElement
                key="author"
                emptyLabel={
                    <FormattedMessage defaultMessage="Author" description="Author placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasAuthor}
            >
                {hasAuthor && !isPlaceholder ? (
                    <Author author={author} className={styles.author} />
                ) : null}
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
        <TransitionGroup>
            {hasPopup || isPlaceholder ? (
                <CSSTransition key="grid" classNames={styles} timeout={500}>
                    <SignsGrid
                        width={width}
                        height={height}
                        className={styles.signsGrid}
                        closeButton={closePopup}
                        background={popupBackground}
                        signs={signs}
                        signSubtitle={signSubtitle}
                    />
                </CSSTransition>
            ) : null}
        </TransitionGroup>,
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
                    shouldLoad={backgroundShouldLoad}
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
                                      paddingTop:
                                          (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
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
                </Scroll>
            </Container>
        </div>
    );
};

Horoscope.propTypes = propTypes;
Horoscope.defaultProps = defaultProps;

export default React.memo(Horoscope);
