/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PlaceholderImage, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderShortText, ScreenElement, Transitions } from '@micromag/core/components';
import { isImageFilled, isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse', 'card', 'title-top']),
    image: MicromagPropTypes.imageElement,
    title: MicromagPropTypes.headingElement,
    text: MicromagPropTypes.textElement,
    legend: MicromagPropTypes.textElement,
    withTitle: PropTypes.bool,
    withText: PropTypes.bool,
    withLegend: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    image: null,
    title: null,
    text: null,
    legend: null,
    withTitle: false,
    withText: false,
    withLegend: false,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: { in: 'fade', out: 'fade' },
    className: null,
};

const ImageScreen = ({
    layout,
    image,
    title,
    text,
    legend,
    withTitle,
    withText,
    withLegend,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasImage = isImageFilled(image);
    const hasTitle = isTextFilled(title);
    const hasText = isTextFilled(text);
    const hasLegend = isTextFilled(legend);

    const [ready, setReady] = useState(!hasImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const isReversed = layout === 'reverse';
    const isTitleTop = layout === 'title-top';
    const isCard = layout === 'card';

    const imageCntRef = useRef(null);
    const [imageSize, setImageSize] = useState(null);

    useEffect(() => {
        const currentImageCntRef = imageCntRef.current;
        if (currentImageCntRef !== null) {
            setImageSize({
                width: currentImageCntRef.offsetWidth,
                height: currentImageCntRef.offsetHeight,
            });
        }
    }, [width, height, layout, setImageSize]);

    const items = [
        <div
            key="image"
            ref={imageCntRef}
            className={styles.imageContainer}
            style={!isPlaceholder ? {margin: isCard ? `0 ${-spacing / 2}px ${spacing / 2}px` : spacing / 2 } : null}
        >
            <ScreenElement
                placeholder={
                    <PlaceholderImage
                        className={styles.placeholderImage}
                        width="100%"
                        height="100%"
                    />
                }
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={!hasImage}
            >
                {hasImage ? (
                    <Transitions transitions={transitions} playing={transitionPlaying} disabled={!isView} fullscreen>
                        <Image
                            className={styles.image}
                            objectFit={{ fit: 'cover' }}
                            {...image}
                            {...imageSize}                            
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
                emptyClassName={styles.empty}
                isEmpty={!hasTitle}
            >
                {hasTitle ? (
                    <Transitions transitions={transitions} playing={transitionPlaying} disabled={!isView}>
                        <div
                            style={!isPlaceholder ? { margin: spacing / 2 } : null}
                        >
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
                emptyClassName={styles.empty}
                isEmpty={!hasText}
            >
                {hasText ? (
                    <Transitions transitions={transitions} playing={transitionPlaying} disabled={!isView}>
                        <div
                            style={!isPlaceholder ? { margin: spacing / 2 } : null}
                        >
                            <Text {...text} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),

        withLegend && (
            <ScreenElement
                key="legend"
                placeholder={<PlaceholderShortText />}
                emptyLabel={
                    <FormattedMessage defaultMessage="Legend" description="Legend placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={!hasLegend}
            >
                {hasLegend ? (
                    <Transitions transitions={transitions} playing={transitionPlaying} disabled={!isView}>
                        <div
                            style={!isPlaceholder ? { margin: spacing / 2 } : null}
                        >
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

    let paddingTop = !isPreview && !landscape ? spacing * 1.5 : spacing / 2;

    if (isCard) {
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
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    style={!isPlaceholder ? { padding: spacing / 2, paddingTop } : null}
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
