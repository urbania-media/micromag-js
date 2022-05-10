/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext, useScreenSize, useViewer } from '@micromag/core/contexts';
import { useResizeObserver } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';
import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    slides: PropTypes.oneOfType([MicromagPropTypes.imageMedias, MicromagPropTypes.imageElements]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    captionMaxLines: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    // transitionStagger: PropTypes.number,
    enableInteraction: PropTypes.func,
    disableInteraction: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    withCaptions: false,
    slides: [],
    spacing: 20,
    captionMaxLines: 2,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    // transitionStagger: 50,
    enableInteraction: null,
    disableInteraction: null,
    className: null,
};

const SlideshowScreen = ({
    // layout,
    slides,
    withCaptions,
    background,
    callToAction,
    current,
    active,
    spacing,
    captionMaxLines,
    transitions,
    // transitionStagger,
    enableInteraction,
    disableInteraction,
    className,
}) => {
    const { width, height, menuOverScreen, resolution } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const finalSpacing = isPlaceholder ? 5 : spacing;

    const [imagesLoaded, setImagesLoaded] = useState(0);

    const ready = true;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();

    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const items = (slides || []).map((item, itemI) => {
        const { visual = null, caption = null } = item || {};
        const imageSize = { width: width / 2, height: height / 2 };

        // const { caption = null } = finalImage || {};

        const hasImage = visual !== null;
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
                                    media={visual}
                                    {...imageSize}
                                    resolution={resolution}
                                    objectFit={{ fit: 'cover' }}
                                    playing={backgroundPlaying}
                                    onLoaded={onImageLoaded}
                                />
                            ): null}
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
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <div
                    className={styles.content}
                    style={{
                        paddingTop: menuOverScreen && !isPreview ? menuSize : null,
                        paddingBottom: hasCallToAction ? callToActionHeight - finalSpacing : 0,
                    }}
                >
                    {items}
                    {!isPlaceholder && hasCallToAction ? (
                        <div style={{ marginTop: -finalSpacing }}>
                            <CallToAction
                                ref={callToActionRef}
                                className={styles.callToAction}
                                callToAction={callToAction}
                                animationDisabled={isPreview}
                                focusable={current && isView}
                                screenSize={{ width, height }}
                                enableInteraction={enableInteraction}
                                disableInteraction={disableInteraction}
                            />
                        </div>
                    ) : null}
                </div>
            </Container>
        </div>
    );
};

SlideshowScreen.propTypes = propTypes;
SlideshowScreen.defaultProps = defaultProps;

export default React.memo(SlideshowScreen);
