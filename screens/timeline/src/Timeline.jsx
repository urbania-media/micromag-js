/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes, useResizeObserver } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
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
    bulletColor: PropTypes.string,
    lineColor: PropTypes.string,
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
};

const defaultProps = {
    layout: 'normal',
    items: [null],
    bulletColor: '#000',
    lineColor: '#000',
    bulletShape: 'circle',
    bulletFilled: true,
    illustrated: false,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: { in: 'fade', out: 'fade' },
    transitionStagger: 75,
    className: null,
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
}) => {
    const { width, height } = useScreenSize();
    const landscape = width > height;

    const { isPlaceholder, isPreview, isView, isEdit } = useScreenRenderContext();

    const itemsCount = items !== null ? items.length : 0;
    const hasItems = items !== null && itemsCount;
    const imagesCount = hasItems
        ? items.reduce((acc, curr) => {
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

    const {
        ref: scrollContentRef,
        entry: { contentRect: scrollContentRefRect },
    } = useResizeObserver({ disabled: isPlaceholder || !items.length });
    const { width: scrollContentRefWidth = '100%' } = scrollContentRefRect || {};

    const timelineElements = items.map((item, itemI) => {
        const { title = null, description = null, image = null } = item || {};

        const hasTitle = title !== null;
        const hasDescription = description !== null;
        const hasImage = image !== null;

        const isEmptyTitle = isEdit && !hasTitle;
        const isEmptyDescription = isEdit && !hasDescription;
        const isEmptyImage = isEdit && !hasImage;

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
                                            isEmpty={isEmptyTitle}
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
                                            isEmpty={isEmptyDescription}
                                        >
                                            {hasElement ? <Text {...description} /> : null}
                                        </ScreenElement>
                                    </div>
                                );
                                break;
                            case 'image':
                                hasElement = hasImage;
                                elementContent = (
                                    <div className={styles.image}>
                                        <ScreenElement
                                            placeholder="image"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Image"
                                                    description="Image placeholder"
                                                />
                                            }
                                            emptyClassName={styles.empty}
                                            isEmpty={isEmptyImage}
                                        >
                                            {hasElement ? (
                                                <Image
                                                    {...image}
                                                    width={scrollContentRefWidth}
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
                            >
                                <div className={styles.timeline}>
                                    <div
                                        className={classNames([
                                            styles.line,
                                            {
                                                [styles.hidden]: topLineHidden,
                                            },
                                        ])}
                                        style={{
                                            backgroundColor: !topLineHidden ? lineColor : null,
                                        }}
                                    />
                                    {type === 'title' ? (
                                        <div
                                            className={styles.bullet}
                                            style={{
                                                borderColor: bulletColor,
                                                backgroundColor: bulletFilled ? bulletColor : null,
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
                                            backgroundColor: !bottomLineHidden ? lineColor : null,
                                        }}
                                    />
                                </div>
                                <div
                                    className={classNames([
                                        styles.content,
                                        { [styles.lastContent]: lastType && !lastItem },
                                    ])}
                                    ref={itemI === 0 ? scrollContentRef : null}
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
                    verticalAlign="center"
                    disabled={isPlaceholder}
                    hideArrow={isPreview}
                >
                    <Layout
                        style={
                            isView || isPreview
                                ? {
                                      padding: spacing,
                                      paddingTop: isView && !landscape ? spacing * 2 : spacing,
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
