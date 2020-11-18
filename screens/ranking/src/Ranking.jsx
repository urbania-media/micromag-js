/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
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
    ascending: PropTypes.bool,
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
    layout: 'side',
    items: [null],
    ascending: false,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: 'fade',
        out: 'fade',
    },
    transitionStagger: 75,
    className: null,
};

const RankingScreen = ({
    layout,
    items,
    ascending,
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

    const isSideLayout = layout === 'side';

    const ranksRefs = useRef([]);
    const [maxSideRankWidth, setMaxSideRankWidth] = useState(null);
    useEffect(() => {
        if (!isSideLayout) {
            return;
        }

        let maxWidth = 0;
        ranksRefs.current.forEach( rankEl => {
            maxWidth = Math.max(maxWidth, rankEl.offsetWidth);
        });
        setMaxSideRankWidth(maxWidth);
    }, [isSideLayout, width, height]);

    const elements = items.map((item, itemI) => {
        const { title = null, description = null } = item || {};

        const hasTitle = title !== null;
        const hasDescription = description !== null;

        const isEmptyTitle = isEdit && !hasTitle;
        const isEmptyDescription = isEdit && !hasDescription;

        const titleElement = (
            <div className={styles.title}>
                <ScreenElement
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                    }
                    emptyClassName={styles.empty}
                    isEmpty={isEmptyTitle}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={current}
                            delay={transitionStagger * itemI}
                            disabled={isPreview}
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
                    isEmpty={isEmptyDescription}
                >
                    {hasDescription ? (
                        <Transitions
                            transitions={transitions}
                            playing={current}
                            delay={transitionStagger * itemI}
                            disabled={!isView}
                        >
                            <Text {...description} />
                        </Transitions>
                    ) : null}
                </ScreenElement>
            </div>
        );

        return (
            <div className={styles.item} key={`item-${itemI}`}>
                <div
                    className={styles.rank}
                    ref={(el) => {
                        ranksRefs.current[itemI] = el;
                    }}
                    style={ isSideLayout ? { width: maxSideRankWidth } : null }
                >
                    <Transitions transitions={transitions} playing={current} delay={transitionStagger * itemI} disabled={!isView}>
                        {ascending ? itemI + 1 : itemsCount - itemI}
                    </Transitions>
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
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio} withScroll>
                <Scroll className={styles.scroll} verticalAlign="center" disabled={isPlaceholder}>
                    <Layout style={isView || isPreview ? { padding: spacing, paddingTop: isView && !landscape ? spacing * 2 : null } : null}>
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
