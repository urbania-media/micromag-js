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
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    padding: PropTypes.number,
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
    padding: 20,
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
    padding,
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

    const hasQuote = quote !== null;
    const hasAuthor = author !== null;

    const isEmpty = isEdit && !hasQuote && !hasAuthor;

    const isSplitted = layout === 'split';
    const distribution = isSplitted ? 'between' : null;
    const verticalAlign = isSplitted ? null : layout;

    const items = [
        (hasQuote || isPlaceholder) && (
            <ScreenElement
                key="quote"
                placeholder="quote"
                emptyLabel={
                    <FormattedMessage defaultMessage="Quote" description="Quote placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Text {...quote} />
            </ScreenElement>
        ),
        isSplitted && hasAuthor && <Spacer />,
        (hasAuthor || isPlaceholder) && (
            <ScreenElement
                key="author"
                placeholder="subtitle"
                emptyLabel={
                    <FormattedMessage defaultMessage="Author" description="Author placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Text {...author} />
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
                    distribution={distribution}
                    style={isView ? { padding } : null}
                >
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        disabled={!isView}
                        playing
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

Quote.propTypes = propTypes;
Quote.defaultProps = defaultProps;

export default React.memo(Quote);
