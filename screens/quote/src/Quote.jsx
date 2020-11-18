/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Quote from '@micromag/element-quote';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
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
    layout: 'top',
    quote: null,
    author: null,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: 'fade',
        out: 'fade',
    },
    transitionStagger: 100,
    className: null,
};

const QuoteScreen = ({
    layout,
    quote,
    author,
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

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuote = quote !== null;
    const hasAuthor = author !== null;

    const isEmpty = isEdit && !hasQuote && !hasAuthor;

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const quoteWithMargin = hasQuote && hasAuthor && !isSplitted;

    const items = [
        (
            <ScreenElement
                key="quote"
                placeholder="quote"
                emptyLabel={
                    <FormattedMessage defaultMessage="Quote" description="Quote placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                { hasQuote ? <Quote className={classNames([styles.quote, { [styles.withMargin] : quoteWithMargin }])} {...quote} /> : null }
            </ScreenElement>
        ),
        isSplitted && hasAuthor && <Spacer key="spacer" />,
        (
            <ScreenElement
                key="author"
                placeholder="subtitle"
                emptyLabel={
                    <FormattedMessage defaultMessage="Author" description="Author placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                { hasAuthor ? <Text className={styles.author} {...author} /> : null }
            </ScreenElement>
        ),
    ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
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
                    verticalAlign={verticalAlign}
                    style={isPreview || isView ? { padding: spacing, paddingTop: isView && !landscape ? spacing * 2 : spacing } : null}
                >
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        disabled={!isView}
                        playing={current}
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

QuoteScreen.propTypes = propTypes;
QuoteScreen.defaultProps = defaultProps;

export default React.memo(QuoteScreen);
