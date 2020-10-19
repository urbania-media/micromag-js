/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderQuote, PlaceholderSubtitle, Empty, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split']),
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
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
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const Quote = ({
    layout,
    quote,
    author,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEdit } = useScreenRenderContext();

    const withQuote = quote !== null;
    const withAuthor = author !== null;

    const isEmpty = isEdit && !withQuote && !withAuthor;

    let quoteElement = null;
    let authorElement = null;

    if (isPlaceholder) {
        quoteElement = <PlaceholderQuote />;
        authorElement = <PlaceholderSubtitle />;
    } else if (isEmpty) {
        quoteElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Quote" description="Quote placeholder" />
            </Empty>
        );
        authorElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Author" description="Author placeholder" />
            </Empty>
        );
    } else {
        let transitionDelay = 0;

        const createElement = (children) => {
            const element = (
                <Transitions transitions={transitions} delay={transitionDelay} playing>
                    {children}
                </Transitions>
            );
            transitionDelay += transitionStagger;
            return element;
        };

        if (withQuote) {
            quoteElement = createElement(<Text {...quote} className={styles.quote} />);
        }
        if (withAuthor) {
            authorElement = createElement(<Text {...author} sclassName={styles.author} />);
        }
    }

    // Add elements to items

    const items = [];
    if (quoteElement !== null) {
        items.push(quoteElement);
    }

    if (authorElement !== null) {
        items.push(authorElement);
    }

    // convert layout to Container props

    const layoutChunks = layout.split('-');
    const isDistribution = layoutChunks[0] === 'split';
    const verticalAlign = isDistribution ? layoutChunks[1] : layoutChunks[0];
    const distribution = isDistribution ? 'between' : null;

    if (layoutChunks.length === 2 && layoutChunks[1] === 'reverse') {
        items.reverse();
    }

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

            <Container
                width={width}
                height={height}
                maxRatio={maxRatio}
                verticalAlign={verticalAlign}
                distribution={distribution}
            >
                {items}
            </Container>
        </div>
    );
};

Quote.propTypes = propTypes;
Quote.defaultProps = defaultProps;

export default React.memo(Quote);
