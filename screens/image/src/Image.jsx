/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useResizeObserver } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'fullscreen', 'reverse', 'card', 'title-top']),
    image: MicromagPropTypes.imageMedia,
    imageFit: MicromagPropTypes.objectFit,
    title: MicromagPropTypes.headingElement,
    text: MicromagPropTypes.textElement,
    legend: MicromagPropTypes.textElement,
    withTitle: PropTypes.bool,
    withText: PropTypes.bool,
    withLegend: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    image: null,
    imageFit: { fit: 'cover' },
    title: null,
    text: null,
    legend: null,
    withTitle: false,
    withText: false,
    withLegend: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    transitions: null,
    className: null,
};

const ImageScreen = ({
    layout,
    image,
    imageFit,
    title,
    text,
    legend,
    withTitle,
    withText,
    withLegend,
    spacing,
    background,
    callToAction,
    current,
    transitions,
    className,
}) => {
    const { width, height, landscape } = useScreenSize();

    const { menuSize } = useViewer();

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);

    const hasImage = image !== null;
    const hasTitle = isTextFilled(title);
    const hasText = isTextFilled(text);
    const hasLegend = isTextFilled(legend);

    const [ready, setReady] = useState(!hasImage);
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const isReversed = layout === 'reverse';
    const isTitleTop = layout === 'title-top';
    const isCard = layout === 'card';
    const isFullscreen = layout === 'fullscreen';

    const finalSpacing = !isFullscreen && !isPlaceholder ? spacing : 0;

    const {
        ref: imageCntRef,
        entry: { contentRect },
    } = useResizeObserver();
    const { width: imageWidth, height: imageHeight } = contentRect || {};

    const items = [
        <div
            key="image"
            ref={imageCntRef}
            className={styles.imageContainer}
            style={
                !isPlaceholder
                    ? {
                          margin: isCard
                              ? `0 ${-finalSpacing / 2}px ${finalSpacing / 2}px`
                              : finalSpacing / 2,
                      }
                    : null
            }
        >
            <ScreenElement
                placeholder="image"
                placeholderProps={{ className: styles.placeholderImage, height: '100%' }}
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.emptyImage}
                isEmpty={!hasImage}
            >
                {hasImage ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                        fullscreen
                    >
                        <Image
                            className={styles.image}
                            media={image}
                            objectFit={imageFit}
                            width={imageWidth}
                            height={imageHeight}
                            onLoaded={onImageLoaded}
                        />
                    </Transitions>
                ) : null}
            </ScreenElement>
        </div>,
        withTitle && (
            <ScreenElement
                key="title"
                placeholder="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.emptyTitle}
                isEmpty={!hasTitle}
            >
                {hasTitle ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <div style={!isPlaceholder ? { margin: finalSpacing / 2 } : null}>
                            <Heading {...title} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),

        withText && (
            <ScreenElement
                key="text"
                placeholder="text"
                emptyLabel={
                    <FormattedMessage defaultMessage="Text" description="Text placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasText}
            >
                {hasText ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <div style={!isPlaceholder ? { margin: finalSpacing / 2 } : null}>
                            <Text {...text} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),

        withLegend && (
            <ScreenElement
                key="legend"
                placeholder="shortText"
                emptyLabel={
                    <FormattedMessage defaultMessage="Legend" description="Legend placeholder" />
                }
                emptyClassName={styles.emptyLegend}
                isEmpty={!hasLegend}
            >
                {hasLegend ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <div style={!isPlaceholder ? { margin: finalSpacing / 2 } : null}>
                            <Text {...legend} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),
    ];

    if (isReversed) {
        items.reverse();
    } else if (isTitleTop) {
        if (withTitle && (hasTitle || isPlaceholder)) {
            items.splice(0, 0, items.splice(1, 1)[0]);
        }
    }

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    if (!isPlaceholder && hasCallToAction) {
        items.push(
            <CallToAction
                key="call-to-action"
                callToAction={callToAction}
                animationDisabled={isPreview}
            />,
        );
    }

    let paddingTop = (!landscape && !isPreview ? menuSize : 0) + finalSpacing / 2;

    if (isCard || isFullscreen) {
        paddingTop = 0;
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isReversed]: isReversed,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isCard]: isCard,
                    [styles.isFullscreen]: isFullscreen,
                },
            ])}
            data-screen-ready={ready}
        >
            {!isPlaceholder ? (
                <Background
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: finalSpacing / 2,
                                  paddingTop,
                              }
                            : null
                    }
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

ImageScreen.propTypes = propTypes;
ImageScreen.defaultProps = defaultProps;

export default React.memo(ImageScreen);
