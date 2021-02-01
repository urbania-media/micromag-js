/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['side', 'over']),
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    numbersStyle: MicromagPropTypes.textStyle,
    ascending: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'side',
    items: [null],
    numbersStyle: null,
    ascending: false,
    spacing: 20,
    background: null,
    current: true,
    transitions: null,
    transitionStagger: 75,
    type: null,
    className: null,
};

const RankingScreen = ({
    layout,
    items,
    numbersStyle,
    ascending,
    spacing,
    background,
    current,
    transitions,
    transitionStagger,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
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

    const finalItems = isPlaceholder ? [...new Array(10)].map(() => ({})) : items;

    const itemsCount = finalItems !== null ? finalItems.length : 0;

    const isSideLayout = layout === 'side';
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;
    const scrollingDisabled = transitionDisabled || !current;
    const backgroundPlaying = current && (isView || isEdit);

    const onScrolledBottom = useCallback(() => {
        trackScreenEvent('scroll', 'Screen');
    }, [trackScreenEvent]);

    const ranksRefs = useRef([]);
    const [maxSideRankWidth, setMaxSideRankWidth] = useState(null);
    useEffect(() => {
        if (!isSideLayout) {
            return;
        }

        let maxWidth = 0;
        ranksRefs.current.forEach((rankEl) => {
            const { style: rankElStyle } = rankEl;
            rankElStyle.width = 'auto';
            maxWidth = Math.max(maxWidth, rankEl.offsetWidth);
        });
        setMaxSideRankWidth(maxWidth);
    }, [isSideLayout, width, height]);

    const elements = finalItems.map((item, itemI) => {
        const { title = null, description = null } = item || {};

        const hasTitle = isTextFilled(title);
        const hasDescription = isTextFilled(description);

        const titleElement = (
            <div className={styles.title}>
                <ScreenElement
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                    }
                    emptyClassName={styles.empty}
                    isEmpty={!hasTitle}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * itemI}
                            disabled={transitionDisabled}
                        >
                            <Heading {...title} />
                        </Transitions>
                    ) : null}
                </ScreenElement>
            </div>
        );

        const descriptionElement = (
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
                    {hasDescription ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * itemI}
                            disabled={transitionDisabled}
                        >
                            <Text {...description} />
                        </Transitions>
                    ) : null}
                </ScreenElement>
            </div>
        );

        const rankText = `${ascending ? itemI + 1 : itemsCount - itemI}`;

        return (
            <div className={styles.item} key={`item-${itemI}`}>
                <div
                    className={styles.rank}
                    ref={(el) => {
                        ranksRefs.current[itemI] = el;
                    }}
                    style={isSideLayout ? { width: maxSideRankWidth } : null}
                >
                    {isPlaceholder ? (
                        rankText
                    ) : (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * itemI}
                            disabled={transitionDisabled}
                        >
                            <Text
                                className={styles.rankText}
                                body={rankText}
                                textStyle={numbersStyle}
                            />
                        </Transitions>
                    )}
                </div>
                <div className={styles.content}>
                    {titleElement}
                    {descriptionElement}
                </div>
            </div>
        );
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles[`${layout}Layout`]]: layout !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
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
                <Scroll
                    className={styles.scroll}
                    verticalAlign="middle"
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                >
                    <Layout
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop:
                                          (!landscape && !isPreview ? menuSize : 0) + spacing,
                                  }
                                : null
                        }
                    >
                        {elements}
                    </Layout>
                </Scroll>
            </Container>
        </div>
    );
};

RankingScreen.propTypes = propTypes;
RankingScreen.defaultProps = defaultProps;

export default RankingScreen;
