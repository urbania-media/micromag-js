/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useTracking } from '@micromag/core/hooks';
import { isTextFilled, getStyleFromColor } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'normal',
        'title-description-image',
        'title-image-description',
        'image-title-description',
    ]),
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    bulletColor: MicromagPropTypes.color,
    lineColor: MicromagPropTypes.color,
    bulletShape: PropTypes.oneOf(['circle', 'square']),
    bulletFilled: PropTypes.bool,
    illustrated: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
    id: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    items: [null],
    bulletColor: null,
    lineColor: null,
    bulletShape: 'circle',
    bulletFilled: true,
    illustrated: false,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 75,
    className: null,
    id: null,
};

const Timeline = ({
    layout,
    items,
    bulletColor,
    lineColor,
    bulletShape,
    bulletFilled,
    illustrated,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
    id,
}) => {
    const { trackEvent } = useTracking();
    const { width, height } = useScreenSize();
    const { menuSize } = useViewer();
    
    const landscape = width > height;

    const { isPlaceholder, isPreview, isView, isEdit } = useScreenRenderContext();

    const finalItems = isPlaceholder ? [...new Array(5)].map(() => ({})): items;

    const onScrolledBottom = useCallback(() => {
        trackEvent(id, 'scroll', 'scroll-bottom');
    }, [id]);

    const itemsCount = finalItems !== null ? finalItems.length : 0;
    const hasItems = finalItems !== null && itemsCount;
    const imagesCount = hasItems
        ? finalItems.reduce((acc, curr) => {
              const { image = null } = curr || {};
              return acc + (image !== null ? 1 : 0);
          }, 0)
        : 0;

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded === imagesCount;
    const transitionsPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const firstLineRef = useRef(null);
    const firstContentRef = useRef(null);
    const [imageWidth, setImageWidth] = useState(0);

    useEffect( () => {
        setImageWidth(firstContentRef.current.offsetWidth - firstLineRef.current.offsetWidth);
    }, [width, height]);

    const timelineElements = finalItems.map((item, itemI) => {
        const { title = null, description = null, image = null } = item || {};

        const hasTitle = isTextFilled(title);
        const hasDescription = isTextFilled(description);
        const hasImage = image !== null;

        const elementsTypes = (layout === 'normal' ? 'title-description-image' : layout).split('-');

        const titleIndex = elementsTypes.indexOf('title');
        const imageIndex = elementsTypes.indexOf('image');

        if (!illustrated) {
            elementsTypes.splice(imageIndex, 1);
        }

        const typesCount = elementsTypes.length;

        return (
            <div className={styles.item} key={`item-${itemI}`}>
                <Transitions
                    transitions={transitions}
                    playing={transitionsPlaying}
                    delay={transitionStagger * itemI}
                    disabled={!isView}
                >
                    {elementsTypes.map((type, typeI) => {
                        let hasElement = false;
                        let elementContent;
                        switch (type) {
                            case 'title':
                                hasElement = hasTitle;
                                elementContent = (
                                    <div className={styles.title}>
                                        <ScreenElement
                                            placeholder="title"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Title"
                                                    description="Title placeholder"
                                                />
                                            }
                                            emptyClassName={styles.empty}
                                            isEmpty={!hasTitle}
                                        >
                                            {hasElement ? <Heading {...title} /> : null}
                                        </ScreenElement>
                                    </div>
                                );
                                break;
                            case 'description':
                            default:
                                hasElement = hasDescription;
                                elementContent = (
                                    <div className={styles.description}>
                                        <ScreenElement
                                            placeholder="text"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Description"
                                                    description="Description placeholder"
                                                />
                                            }
                                            emptyClassName={styles.empty}
                                            isEmpty={!hasDescription}
                                        >
                                            {hasElement ? <Text {...description} /> : null}
                                        </ScreenElement>
                                    </div>
                                );
                                break;
                            case 'image':
                                hasElement = hasImage;
                                elementContent = (
                                    <div className={styles.imageContainer}>
                                        <ScreenElement
                                            placeholder="image"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Image"
                                                    description="Image placeholder"
                                                />
                                            }
                                            emptyClassName={styles.empty}
                                            isEmpty={!hasImage}
                                        >
                                            {hasElement ? (
                                                <Image
                                                    className={styles.image}
                                                    media={image}
                                                    width={imageWidth}
                                                    onLoaded={onImageLoaded}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                    </div>
                                );
                                break;
                        }

                        const firstItem = itemI === 0;
                        const lastItem = itemI === itemsCount - 1;
                        const lastType = typeI === typesCount - 1;
                        const topLineHidden =
                            (firstItem && typeI <= titleIndex) || (lastItem && typeI > titleIndex);
                        const bottomLineHidden =
                            (firstItem && typeI < titleIndex) || (lastItem && typeI >= titleIndex);

                        return (
                            <div
                                key={`element-${type}`}
                                className={classNames([styles.element, styles[`element-${type}`]])}
                                ref={itemI === 0 ? firstContentRef : null}
                            >
                                <div className={styles.timeline} ref={itemI === 0 ? firstLineRef : null}>
                                    <div
                                        className={classNames([
                                            styles.line,
                                            {
                                                [styles.hidden]: topLineHidden,
                                            },
                                        ])}
                                        style={{
                                            ...(!topLineHidden ? getStyleFromColor(lineColor, 'backgroundColor') : null),
                                        }}
                                    />
                                    {type === 'title' ? (
                                        <div
                                            className={styles.bullet}
                                            style={{
                                                ...getStyleFromColor(bulletColor, 'borderColor'),
                                                ...(bulletFilled ? getStyleFromColor(bulletColor, 'backgroundColor') : null),
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        className={classNames([
                                            styles.line,
                                            {
                                                [styles.hidden]: bottomLineHidden,
                                            },
                                        ])}
                                        style={{
                                            ...(!bottomLineHidden ? getStyleFromColor(lineColor, 'backgroundColor') : null),
                                        }}
                                    />
                                </div>
                                <div
                                    className={classNames([
                                        styles.content,
                                        { [styles.lastContent]: lastType && !lastItem },
                                    ])}
                                >
                                    {elementContent}
                                </div>
                            </div>
                        );
                    })}
                </Transitions>
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
                    [styles[`${bulletShape}BulletShape`]]: bulletShape !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio} withScroll>
                <Scroll
                    className={styles.scroll}
                    verticalAlign="middle"
                    disabled={isPlaceholder || isPreview}
                    onScrolledBottom={onScrolledBottom}
                >
                    <Layout
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop: (!landscape && !isPreview ? menuSize : 0) + spacing,
                                  }
                                : null
                        }
                    >
                        {timelineElements}
                    </Layout>
                </Scroll>
            </Container>
        </div>
    );
};

Timeline.propTypes = propTypes;
Timeline.defaultProps = defaultProps;

export default Timeline;
