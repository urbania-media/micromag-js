/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderShortText, ScreenElement, TransitionsStagger } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout /* , { Spacer } */ from '@micromag/element-layout';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse', 'title-top']),
    image: MicromagPropTypes.imageMedia,
    title: MicromagPropTypes.headingElement,
    text: MicromagPropTypes.textElement,
    legend: MicromagPropTypes.textElement,
    withTitle: PropTypes.bool,
    withText: PropTypes.bool,
    withLegend: PropTypes.bool,
    padding: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    maxImageRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
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
    padding: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    maxImageRatio: 5 / 6,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 100,
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
    padding,
    background,
    current,
    active,
    maxRatio,
    maxImageRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();    

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasImage = image !== null;
    const hasTitle = title !== null;
    const hasText = text !== null;
    const hasLegend = legend !== null;    

    const isEmpty = isEdit && !hasTitle && !hasImage;

    const [ready, setReady] = useState(!hasImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const isReversed = layout === 'reverse';
    const isTitleTop = layout === 'title-top';

    const screenRatio = width / height;
    const maxWidth = maxRatio !== null && screenRatio > maxRatio ? height * maxRatio : width;
    const imageWidth = maxWidth - padding * 2;
    const imageHeight = imageWidth / maxImageRatio;

    const items = [
        (
            <ScreenElement
                key="image"
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                { hasImage ?
                    <Image
                        {...image}
                        width={imageWidth}
                        height={imageHeight}
                        shrinkHeight
                        objectFit={{ fit: 'contain' }}
                        onLoaded={onImageLoaded}
                    />
                : null }
                
            </ScreenElement>
        ),
        withTitle && (
            <ScreenElement
                key="title"
                placeholder="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                { hasTitle ? <Heading {...title} /> : null }
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
                isEmpty={isEmpty}
            >
                { hasText ? <Text {...text} /> : null }
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
                isEmpty={isEmpty}
            >
                { hasLegend ? <Text {...legend} /> : null }
            </ScreenElement>
        )
    ];

    if (isReversed) {
        items.reverse();
    } else if (isTitleTop) {
        if (withTitle && (hasTitle || isPlaceholder)) {
            items.splice(0, 0, items.splice(1, 1)[0]);
        }
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
                    fullscreen
                    style={isView || isPreview ? { padding } : null}
                >
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        disabled={!isView && !isPreview}
                        playing={transitionPlaying}
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

ImageScreen.propTypes = propTypes;
ImageScreen.defaultProps = defaultProps;

export default React.memo(ImageScreen);
