/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/element-text';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles-block.module.scss';

const propTypes = {
    quote: MicromagPropTypes.textElement,
    source: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    centered: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    quote: null,
    author: null,
    source: null,
    centered: false,
    isPlaceholder: false,
    showEmpty: false,
    className: null,
};

const QuoteBlock = ({ quote, source, author, isPlaceholder, showEmpty, centered }) => {
    return isPlaceholder ? (
        <blockquote
            className={classNames([
                styles.placeholderContainer,
                {
                    [styles.centered]: centered,
                },
            ])}
        >
            <div className={styles.placeholderInner}>
                <Placeholders.Text className={styles.placeholder} />
                <Placeholders.Line className={styles.placeholderSource} />
            </div>
        </blockquote>
    ) : (
        <figure
            className={classNames([
                styles.figure,
                {
                    [styles.centered]: centered,
                },
            ])}
        >
            <blockquote
                className={classNames([
                    styles.blockquote,
                    {
                        [styles.empty]: showEmpty && quote === null,
                    },
                ])}
            >
                <TextComponent
                    {...quote}
                    showEmpty={showEmpty && quote === null}
                    className={styles.quote}
                    emptyClassName={styles.empty}
                />
            </blockquote>
            {author || source ? (
                <figcaption className={styles.caption}>
                    {author ? (
                        <>
                            <span>&mdash;</span>
                            <TextComponent {...author} className={styles.author} />
                        </>
                    ) : null}{' '}
                    {source ? (
                        <cite>
                            <TextComponent {...source} className={styles.source} />
                        </cite>
                    ) : null}
                </figcaption>
            ) : null}
        </figure>
    );
};

QuoteBlock.propTypes = propTypes;
QuoteBlock.defaultProps = defaultProps;

export default QuoteBlock;
