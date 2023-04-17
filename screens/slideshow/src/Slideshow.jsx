/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { useDimensionObserver } from '@micromag/core/hooks';
import { isTextFilled, isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './slideshow.module.scss';

// TODO: make this happen

const propTypes = {
    // layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    slides: PropTypes.oneOfType([MicromagPropTypes.imageMedias, MicromagPropTypes.imageElements]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    captionMaxLines: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    // layout: 'middle',
    withCaptions: false,
    slides: [],
    spacing: 20,
    captionMaxLines: 2,
    background: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    transitions: null,
    className: null,
};

const SlideshowScreen = ({
    // layout,
    slides,
    withCaptions,
    background,
    header,
    footer,
    current,
    active,
    spacing,
    captionMaxLines,
    transitions,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const finalSpacing = isPlaceholder ? 5 : spacing;

    const [imagesLoaded, setImagesLoaded] = useState(0);

    const ready = true;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);

    // Head and foot
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, {
        isView,
        current,
        isPreview,
        enableInteraction,
        disableInteraction,
    });

    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();
    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();

    const items = (slides || []).map((item, itemI) => {
        const { media = null, caption = null } = item || {};
        const imageSize = { width, height };
        // console.log(imageSize);
        // const { caption = null } = finalImage || {};

        const hasImage = media !== null;
        const hasCaption = isTextFilled(caption);

        return (
            <div key={`item-${itemI}`} className={styles.gridItem}>
                <div
                    className={styles.imageContainer}
                    ref={(el) => {
                        imagesEl.current[itemI] = el;
                    }}
                >
                    <Transitions
                        transitions={transitions}
                        delay={1}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                        fullscreen
                    >
                        <ScreenElement
                            placeholder="image"
                            placeholderProps={{ className: styles.placeholder, height: '100%' }}
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Image"
                                    description="Image placeholder"
                                />
                            }
                            emptyClassName={styles.emptyImage}
                            isEmpty={!hasImage}
                        >
                            {mediaShouldLoad ? (
                                <Visual
                                    className={styles.image}
                                    media={media}
                                    {...imageSize}
                                    resolution={resolution}
                                    objectFit={{ fit: 'cover' }}
                                    playing={backgroundPlaying}
                                    active={active}
                                    withoutVideo={isPreview}
                                    onLoaded={onImageLoaded}
                                />
                            ) : null}
                        </ScreenElement>
                    </Transitions>
                </div>
                {withCaptions ? (
                    <Transitions
                        transitions={transitions}
                        delay={1}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <ScreenElement
                            placeholder="line"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Caption"
                                    description="Caption placeholder"
                                />
                            }
                            emptyClassName={styles.emptyCaption}
                            isEmpty={!hasCaption}
                        >
                            <div className={styles.caption}>
                                <Text
                                    {...caption}
                                    className={styles.captionText}
                                    lineClamp={captionMaxLines}
                                />
                            </div>
                        </ScreenElement>
                    </Transitions>
                ) : null}
            </div>
        );
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <div
                    className={styles.inner}
                    style={{
                        paddingTop: !isPreview ? viewerTopHeight : null,
                        paddingBottom:
                            (hasFooter ? footerHeight - finalSpacing : 0) +
                            (current && !isPreview ? viewerBottomHeight : 0),
                    }}
                >
                    {!isPlaceholder && hasHeader ? (
                        <div
                            className={styles.header}
                            ref={headerRef}
                            style={{ padding: finalSpacing }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}
                    {items}
                    {!isPlaceholder && hasFooter ? (
                        <div
                            className={styles.footer}
                            ref={footerRef}
                            style={{ padding: finalSpacing / 2 }}
                        >
                            <Footer {...footerProps} />
                        </div>
                    ) : null}
                </div>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

SlideshowScreen.propTypes = propTypes;
SlideshowScreen.defaultProps = defaultProps;

export default React.memo(SlideshowScreen);
