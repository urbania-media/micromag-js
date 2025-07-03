/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { animated, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import shuffle from 'lodash/shuffle';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getFooterProps,
    getStyleFromBox,
    getStyleFromText,
    isFooterFilled,
    isHeaderFilled,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './game-sort.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    heading: MicromagPropTypes.headingElement,
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array,
    spacing: PropTypes.number,
    buttonStyles: PropTypes.shape({}),
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    id: PropTypes.string,
    index: PropTypes.number,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    heading: null,
    items: null,
    buttonStyles: null,
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    id: null,
    index: null,
    current: true,
    active: true,
    className: null,
};

const ShareScreen = ({
    layout,
    heading,
    items,
    buttonStyles,
    spacing,
    background,
    header,
    footer,
    id,
    index,
    current,
    active,
    className,
}) => {
    const intl = useIntl();
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const {
        layout: buttonLayout = null,
        textStyle: buttonTextStyle = null,
        boxStyle: buttonBoxStyle = null,
        validBoxStyle = null,
        invalidBoxStyle = null,
        submitBoxStyle = null,
        submitButtonLabel = null,
        validatedButtonLabel = null,
    } = buttonStyles || {};

    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();

    const trackingEnabled = isView;
    const trackEvent = useTrackScreenEvent('game-sort');

    const [sortedItems, setSortedItems] = useState(isView ? shuffle(items || []) : items || []);
    const sortedItemsRef = useRef(sortedItems);
    const currentItemsRef = useRef(items);
    useEffect(() => {
        if (currentItemsRef.current !== items) {
            const newSortedItems = isView ? shuffle(items || []) : items || [];
            setSortedItems(newSortedItems);
            sortedItemsRef.current = newSortedItems;
            currentItemsRef.current = items;
        }
    }, [items]);

    const getNewSortedItems = useCallback((currentItems, item, newIndex, replace = true) => {
        const currentIndex = currentItems.findIndex((it) => it === item);
        const newSortedItems = [...currentItems];
        const currentItem = newSortedItems[newIndex];
        newSortedItems[newIndex] = item;
        newSortedItems[currentIndex] = currentItem;
        return newSortedItems;
    }, []);

    const updateIndex = useCallback(
        (item, newIndex) => {
            const newSortedItems = getNewSortedItems(sortedItems, item, newIndex);
            setSortedItems(newSortedItems);
            sortedItemsRef.current = newSortedItems;
        },
        [sortedItems, getNewSortedItems],
    );

    const [springs, api] = useSprings(
        (items || []).length,
        () => ({
            y: `0%`,
            scale: 1,
        }),
        [],
    );

    const itemsRef = useRef([]);
    const [initialSorted, setInitialSorted] = useState(false);
    const updateSpring = useCallback(
        (currentItems, { dragItem, dragY, initial = false } = {}) => {
            const heights = itemsRef.current.map(
                (item) => item?.getBoundingClientRect()?.height || 0,
            );
            api.start((itemIndex) => {
                const item = (items || [])[itemIndex] || null;
                const sortedIndex = currentItems.findIndex((it) => it === item);
                const currentHeight = heights[itemIndex] || 0;
                if (item === dragItem) {
                    const currentY = heights
                        .slice(0, itemIndex)
                        .reduce((acc, itemHeight) => acc + itemHeight, 0);
                    const deltaY = dragY - currentY;
                    return {
                        y: `${(deltaY / currentHeight) * 100}%`,
                        scale: 1.02,
                        immediate: true,
                    };
                }
                if (itemIndex === sortedIndex) {
                    return {
                        y: `0%`,
                        scale: 1,
                        immediate: initial,
                    };
                }
                const currentY = heights
                    .slice(0, itemIndex)
                    .reduce((acc, itemHeight) => acc + itemHeight, 0);
                const newY = heights
                    .slice(0, sortedIndex)
                    .reduce((acc, itemHeight) => acc + itemHeight, 0);
                const deltaY = newY - currentY;
                return {
                    y: `${(deltaY / currentHeight) * 100}%`,
                    scale: 1,
                    immediate: initial,
                };
            });
            if (initial) {
                setInitialSorted(true);
            }
        },
        [api],
    );

    const initialSortedItemsRef = useRef(sortedItems);
    useEffect(() => {
        if (!isView) {
            return;
        }
        updateSpring(sortedItems, {
            initial: initialSortedItemsRef.current === sortedItems,
        });
    }, [sortedItems]);

    const [validated, setValidated] = useState(null);
    const bind = useDrag(
        ({ args: [itemIndex], active: dragActive, movement: [, movementY], tap }) => {
            const item = items[itemIndex] || {};
            if (tap) {
                const currentIndex = sortedItems.findIndex((it) => it === item);
                const newIndex = currentIndex === 0 ? sortedItems.length - 1 : currentIndex - 1;
                updateIndex(item, newIndex);
                return;
            }
            const sortedIndex = sortedItems.findIndex((it) => it === item);
            const heights = sortedItems.map((sortedItem) => {
                const index = items.findIndex((it) => it === sortedItem);
                return itemsRef.current[index]?.getBoundingClientRect()?.height || 0;
            });
            const ys = heights.map((itemHeight, index) => {
                const endY = itemHeight + heights.slice(0, index).reduce((acc, h) => acc + h, 0);
                return {
                    isStart: index === 0,
                    isEnd: index === heights.length - 1,
                    start: endY - itemHeight,
                    end: endY,
                };
            });
            const newY = ys[sortedIndex].end - heights[sortedIndex] / 2 + movementY;
            const newIndex = ys.findIndex(
                ({ isStart, isEnd, start, end }) =>
                    (isStart || newY >= start) && (isEnd || newY < end),
            );
            if (dragActive) {
                const newSortedItems = getNewSortedItems(sortedItemsRef.current, item, newIndex);
                sortedItemsRef.current = newSortedItems;
                updateSpring(newSortedItems, {
                    dragItem: item,
                    dragY: ys[sortedIndex].start + movementY,
                });
            } else {
                setSortedItems(sortedItemsRef.current);
                // updateIndex(item, newIndex !== -1 ? newIndex : sortedIndex);
            }
            // console.log({
            //     movementY,
            //     newY,
            //     itemIndex,
            //     sortedIndex,
            //     newIndex,
            //     ys,
            //     items: sortedItemsRef.current.map(({ label }) => label),
            // });
        },
        {
            axis: 'y',
            preventDefault: true,
            filterTaps: true,
            enabled: isView && active && current && validated === null,
            // preventScroll: 250,
            // preventScrollAxis: 'y',
        },
    );

    const onClickSubmit = useCallback(() => {
        setValidated(
            items.map((it, index) => {
                const sortedIndex = sortedItems.findIndex((sortedItem) => sortedItem === it);
                return index === sortedIndex;
            }),
        );
    }, [items, sortedItems]);

    useEffect(() => {
        if (validated === null) {
            return () => {};
        }

        const timeout = setTimeout(() => {
            setSortedItems(items);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [validated]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.sorted]: initialSorted || !isView,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Container width={width} height={height} className={styles.content}>
                <Layout
                    className={styles.layout}
                    verticalAlign={layout}
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) +
                                      (headerHeight || spacing),
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (footerHeight || spacing),
                              }
                            : null
                    }
                >
                    {!isPlaceholder && hasHeader ? (
                        <div
                            className={styles.header}
                            ref={headerRef}
                            style={{
                                paddingTop: spacing / 2,
                                paddingBottom: spacing,
                                paddingLeft: spacing,
                                paddingRight: spacing,
                                transform: `translate(0px, ${viewerTopHeight}px)`,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}
                    <ScreenElement
                        key="title"
                        placeholder="title"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Heading"
                                description="Heading placeholder"
                            />
                        }
                        emptyClassName={styles.emptyHeading}
                        isEmpty={!heading || heading?.body === ''}
                    >
                        {heading ? (
                            <Heading className={classNames([styles.heading])} {...heading} />
                        ) : null}
                    </ScreenElement>
                    <Spacer key="spacer" size={5} />
                    <ScreenElement
                        key="items"
                        placeholder="items"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Buttons"
                                description="Title placeholder"
                            />
                        }
                        className={styles.items}
                        emptyClassName={styles.emptyItems}
                        isEmpty={(items || []).length === 0}
                    >
                        {springs.map((props, itemIndex) => {
                            const item = items[itemIndex] || {};
                            const { visual = null, label: itemLabel, boxStyle = null } = item || {};
                            const finalLabel = isString(itemLabel)
                                ? { body: itemLabel }
                                : itemLabel || {};
                            const { body: label = null, textStyle = null } = finalLabel || {};
                            const isEmpty = label === null && visual === null;
                            const isValid = validated !== null && validated[itemIndex];
                            return (
                                <animated.div
                                    key={`button-${itemIndex}`}
                                    className={classNames([
                                        styles.item,
                                        {
                                            [styles.isEmpty]: isEmpty,
                                            [styles.valid]: validated !== null && isValid,
                                            [styles.invalid]: validated !== null && !isValid,
                                        },
                                    ])}
                                    ref={(ref) => {
                                        itemsRef.current[itemIndex] = ref;
                                    }}
                                    {...bind(itemIndex)}
                                    style={{
                                        ...props,
                                        ...getStyleFromText(buttonTextStyle),
                                        ...getStyleFromText(textStyle),
                                    }}
                                    // onClick={(e) => onItemClick(e, item)}
                                >
                                    <div
                                        className={classNames([
                                            styles.button,
                                            {
                                                [styles.layoutLabelBottom]:
                                                    buttonLayout === 'label-bottom',
                                                [styles.layoutLabelTop]:
                                                    buttonLayout === 'label-top',
                                                [styles.layoutNoLabel]: buttonLayout === 'no-label',
                                                [styles.layoutLabelOver]:
                                                    buttonLayout === 'label-over',
                                            },
                                        ])}
                                        style={{
                                            ...getStyleFromBox(buttonBoxStyle),
                                            ...getStyleFromBox(boxStyle),
                                            ...getStyleFromBox(
                                                validated && isValid ? validBoxStyle : null,
                                            ),
                                            ...getStyleFromBox(
                                                validated && !isValid ? invalidBoxStyle : null,
                                            ),
                                        }}
                                        // onClick={(e) => onItemClick(e, item, itemIndex)}
                                    >
                                        {visual !== null ? (
                                            <Visual
                                                className={styles.buttonVisual}
                                                imageClassName={styles.thumbnail}
                                                media={visual}
                                                width="auto"
                                            />
                                        ) : null}
                                        {label !== null ? (
                                            <Text
                                                className={styles.buttonLabel}
                                                {...finalLabel}
                                                textStyle={{
                                                    ...getStyleFromText(buttonTextStyle),
                                                    ...getStyleFromText(textStyle),
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </animated.div>
                            );
                        })}
                    </ScreenElement>
                    <Button
                        className={styles.submitButton}
                        disabled={validated !== null}
                        type="button"
                        onClick={onClickSubmit}
                        style={getStyleFromBox(submitBoxStyle)}
                    >
                        {validated !== null ? (
                            <Text
                                className={styles.buttonLabel}
                                body={intl.formatMessage({
                                    defaultMessage: 'Validated',
                                    description: 'Button label',
                                })}
                                {...validatedButtonLabel}
                            />
                        ) : (
                            <Text
                                className={styles.buttonLabel}
                                body={intl.formatMessage({
                                    defaultMessage: 'Submit',
                                    description: 'Button label',
                                })}
                                {...submitButtonLabel}
                            />
                        )}
                    </Button>
                    {!isPlaceholder && hasFooter ? (
                        <div
                            className={styles.footer}
                            ref={footerRef}
                            style={{
                                paddingTop: spacing,
                                paddingBottom: spacing / 2,
                                paddingLeft: Math.max(viewerBottomSidesWidth - spacing, 0),
                                paddingRight: Math.max(viewerBottomSidesWidth - spacing, 0),
                            }}
                        >
                            <Footer {...footerProps} />
                        </div>
                    ) : null}
                </Layout>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={backgroundShouldLoad}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

ShareScreen.propTypes = propTypes;
ShareScreen.defaultProps = defaultProps;

export default ShareScreen;
