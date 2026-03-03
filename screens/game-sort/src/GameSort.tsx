/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { animated, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import shuffle from 'lodash/shuffle';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
    BackgroundElement,
    BoxStyle,
    Footer as FooterConfig,
    Header as HeaderConfig,
    HeadingElement,
    TextElement,
    TextStyle,
} from '@micromag/core';
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

import styles from './game-sort.module.css';

interface GameSortProps {
    layout?: 'top' | 'middle' | 'bottom';
    heading?: HeadingElement | null;
    items?: unknown[] | null;
    spacing?: number;
    itemsLayout?: 'label-bottom' | 'label-top' | 'no-label' | 'label-over';
    itemsBoxStyle?: BoxStyle | null;
    itemsTextStyle?: TextStyle | null;
    itemsResultsTextStyle?: TextStyle | null;
    validBoxStyle?: BoxStyle | null;
    invalidBoxStyle?: BoxStyle | null;
    submitBoxStyle?: BoxStyle | null;
    submitTextStyle?: TextStyle | null;
    submitButtonLabel?: string | null;
    results?: TextElement | null;
    resultsBoxStyle?: BoxStyle | null;
    background?: BackgroundElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    active?: boolean;
    className?: string | null;
}

function GameSort({
    layout = 'top',
    heading = null,
    items: initialItems = null,
    spacing = 20,
    itemsLayout = 'label-bottom',
    itemsBoxStyle = null,
    itemsTextStyle = null,
    itemsResultsTextStyle = null,
    validBoxStyle = null,
    invalidBoxStyle = null,
    submitBoxStyle = null,
    submitTextStyle = null,
    submitButtonLabel = null,
    results = null,
    resultsBoxStyle = null,
    background = null,
    header = null,
    footer = null,
    current = true,
    active = true,
    className = null,
}: GameSortProps) {
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
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);

    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const backgroundShouldLoad = current || active;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();
    const { ref: itemsRef, height: itemsHeight = 0 } = useDimensionObserver();

    const trackingEnabled = isView;
    const trackEvent = useTrackScreenEvent('game-sort');

    const items = useMemo(
        () =>
            (initialItems || []).map((item, itemIndex) => ({
                id: `item-${itemIndex}`,
                ...item,
            })),
        [initialItems],
    );
    const shouldShuffle = isView;
    const [sortedItems, setSortedItems] = useState(
        shouldShuffle ? shuffle(items || []) : items || [],
    );
    const sortedItemsRef = useRef(sortedItems);
    const currentItemsRef = useRef(items);
    const elementsRef = useRef({});
    const [initialSorted, setInitialSorted] = useState(false);
    const [validated, setValidated] = useState(null);
    const initialSortedItemsRef = useRef(sortedItems);
    const [resultsVisible, setResultsVisible] = useState(false);
    const dragEnabled = isView && active && current && validated === null;
    useEffect(() => {
        if (currentItemsRef.current !== items && !isView) {
            const newSortedItems = shouldShuffle ? shuffle(items || []) : items || [];
            setSortedItems(newSortedItems);
            sortedItemsRef.current = newSortedItems;
            currentItemsRef.current = items;
        }
    }, [items]);

    const getNewSortedItems = useCallback((currentItems, item, newIndex) => {
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

    const updateSpring = useCallback(
        (currentItems, { dragItem, dragY, initial = false } = {}) => {
            const refs = currentItems.map((it) => elementsRef.current[it.id] || null);
            const initialRefs = (items || []).map((it) => elementsRef.current[it.id] || null);
            const initialHeights = initialRefs.map(
                (it) => it?.getBoundingClientRect()?.height || 0,
            );
            const heights = refs.map((it) => it?.getBoundingClientRect()?.height || 0);
            // console.log('heights', heights);
            api.start((itemIndex) => {
                const item = (items || [])[itemIndex] || null;

                const sortedIndex = currentItems.findIndex((it) => it.id === item.id);

                const currentHeight = initialHeights[itemIndex] || 0;
                const currentY = initialHeights
                    .slice(0, itemIndex)
                    .reduce((acc, itemHeight) => acc + itemHeight, 0);

                // This works
                if (item === dragItem) {
                    const deltaY = dragY - currentY;
                    return {
                        y: `${(deltaY / currentHeight) * 100}%`,
                        scale: 1.02,
                        immediate: true,
                    };
                }

                // if (itemIndex === sortedIndex) {
                //     return {
                //         y: `0%`,
                //         scale: 1,
                //         immediate: initial,
                //     };
                // }

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

    useEffect(() => {
        if (!isView) {
            return;
        }

        updateSpring(sortedItems, {
            initial: initialSortedItemsRef.current === sortedItems,
        });
    }, [sortedItems, itemsHeight]);

    const bind = useDrag(
        ({ args: [itemIndex], active: dragActive, movement: [, movementY], tap }) => {
            const item = items[itemIndex] || {};
            if (tap) {
                const currentIndex = sortedItems.findIndex((it) => it === item);
                const newIndex = currentIndex === 0 ? sortedItems.length - 1 : currentIndex - 1;
                updateIndex(item, newIndex);
                if (trackingEnabled) {
                    trackEvent('tap', `item_${itemIndex}`);
                }
                return;
            }
            const sortedIndex = sortedItems.findIndex((it) => it === item);

            // const heights = sortedItems.map((sortedItem) => {
            //     const elementIndex = items.findIndex((it) => it === sortedItem);
            //     return elementsRef.current[elementIndex]?.getBoundingClientRect()?.height || 0;
            // });

            const refs = sortedItems.map((it) => elementsRef.current[it.id] || null);
            const heights = refs.map((it) => it?.getBoundingClientRect()?.height || 0);

            const ys = heights.map((itemHeight, heightIndex) => {
                const endY =
                    itemHeight + heights.slice(0, heightIndex).reduce((acc, h) => acc + h, 0);
                return {
                    isStart: heightIndex === 0,
                    isEnd: heightIndex === heights.length - 1,
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
                if (trackingEnabled) {
                    trackEvent('drag', `item_${itemIndex}`);
                }
                // updateIndex(item, newIndex !== -1 ? newIndex : sortedIndex);
            }
        },
        {
            axis: 'y',
            preventDefault: true,
            filterTaps: true,
            enabled: dragEnabled,
        },
    );

    const onClickSubmit = useCallback(() => {
        const newValidated = items.map((it, itemIndex) => {
            const sortedIndex = sortedItems.findIndex((sortedItem) => sortedItem === it);
            return itemIndex === sortedIndex;
        });
        setValidated(newValidated);
        const allValid = newValidated.reduce((acc, isValid) => acc && isValid, true);
        const invalidCount = newValidated.filter((isValid) => !isValid).length;
        if (trackingEnabled) {
            trackEvent('submit', allValid ? 'valid' : `invalid_${invalidCount}`);
        }
    }, [items, sortedItems, trackingEnabled, trackEvent]);

    useEffect(() => {
        if (validated === null) {
            return () => {};
        }

        const timeout = setTimeout(() => {
            setSortedItems(items);
            setResultsVisible(true);
        }, 1000);
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
                    [styles.draggable]: dragEnabled,
                    [styles.resultsVisible]: resultsVisible,
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
                    <div className={styles.items} ref={itemsRef}>
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
                            emptyClassName={styles.emptyItems}
                            isEmpty={(items || []).length === 0}
                        >
                            {springs.map(({ y, scale }, itemIndex) => {
                                const item = items[itemIndex] || {};
                                const {
                                    id = null,
                                    visual = null,
                                    label: itemLabel,
                                    boxStyle = null,
                                    results: itemResults = null,
                                } = item || {};
                                const finalLabel = isString(itemLabel)
                                    ? { body: itemLabel }
                                    : itemLabel || {};
                                const { body: label = null, textStyle: labelTextStyle } =
                                    finalLabel || {};
                                const isEmpty = label === null && visual === null;
                                const isValid = validated !== null && validated[itemIndex];
                                return (
                                    <animated.div
                                        key={`button-${itemIndex}`}
                                        className={classNames([
                                            styles.item,

                                            {
                                                clickable: dragEnabled,
                                                [styles.isEmpty]: isEmpty,
                                                [styles.valid]: validated !== null && isValid,
                                                [styles.invalid]: validated !== null && !isValid,
                                            },
                                        ])}
                                        ref={(ref) => {
                                            elementsRef.current[id] = ref;
                                        }}
                                        style={{
                                            transform: y.to((yValue) => `translateY(${yValue})`),
                                            ...getStyleFromText(itemsTextStyle),
                                            ...getStyleFromText(labelTextStyle),
                                        }}
                                        {...bind(itemIndex)}
                                        // onClick={(e) => onItemClick(e, item)}
                                    >
                                        <div className={styles.itemInner}>
                                            <animated.div
                                                className={classNames([
                                                    styles.button,
                                                    {
                                                        [styles.layoutLabelBottom]:
                                                            itemsLayout === 'label-bottom',
                                                        [styles.layoutLabelTop]:
                                                            itemsLayout === 'label-top',
                                                        [styles.layoutNoLabel]:
                                                            itemsLayout === 'no-label',
                                                        [styles.layoutLabelOver]:
                                                            itemsLayout === 'label-over',
                                                    },
                                                ])}
                                                style={{
                                                    transform: scale.to(
                                                        (scaleValue) => `scale(${scaleValue})`,
                                                    ),
                                                    ...getStyleFromBox(itemsBoxStyle),
                                                    ...getStyleFromBox(boxStyle),
                                                    ...getStyleFromBox(
                                                        validated && isValid ? validBoxStyle : null,
                                                    ),
                                                    ...getStyleFromBox(
                                                        validated && !isValid
                                                            ? invalidBoxStyle
                                                            : null,
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
                                                {label !== null ||
                                                (itemResults !== null && resultsVisible) ? (
                                                    <div className={styles.buttonLabel}>
                                                        {label !== null ? (
                                                            <Text
                                                                {...finalLabel}
                                                                textStyle={{
                                                                    ...itemsTextStyle,
                                                                    ...labelTextStyle,
                                                                }}
                                                                className={styles.label}
                                                            />
                                                        ) : null}
                                                        {itemResults !== null && resultsVisible ? (
                                                            <Text
                                                                {...itemResults}
                                                                className={styles.buttonResults}
                                                                textStyle={{
                                                                    ...itemsResultsTextStyle,
                                                                    ...itemResults.textStyle,
                                                                }}
                                                            />
                                                        ) : null}
                                                    </div>
                                                ) : null}
                                            </animated.div>
                                        </div>
                                    </animated.div>
                                );
                            })}
                        </ScreenElement>
                    </div>
                    {resultsVisible && results !== null ? (
                        <div
                            className={styles.results}
                            style={{
                                ...getStyleFromBox(resultsBoxStyle),
                            }}
                        >
                            <Text {...results} />
                        </div>
                    ) : (
                        <Button
                            className={styles.submitButton}
                            disabled={validated !== null}
                            type="button"
                            onClick={onClickSubmit}
                            style={{
                                ...getStyleFromBox(submitBoxStyle),
                                ...getStyleFromText(submitTextStyle),
                            }}
                        >
                            {submitButtonLabel ||
                                intl.formatMessage({
                                    defaultMessage: 'Submit',
                                    description: 'Button label',
                                })}
                        </Button>
                    )}
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
}

export default GameSort;
