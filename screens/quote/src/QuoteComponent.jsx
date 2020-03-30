/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Text from '@micromag/component-text';
import Box from '@micromag/component-box';
import Grid from '@micromag/component-grid';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    quote: MicromagPropTypes.textComponent,
    source: MicromagPropTypes.textComponent,
    author: MicromagPropTypes.textComponent,
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    position: PropTypes.number,
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    quote: null,
    author: null,
    source: null,
    grid: null,
    box: null,
    textAlign: 'center',
    position: 1,
    isPlaceholder: false,
    isPreview: false,
    className: null,
};

const QuoteComponent = ({
    background,
    quote,
    source,
    author,
    grid,
    box,
    textAlign,
    position,
    isPlaceholder,
    isPreview,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { layout = [] } = grid || {};

    // console.log('size', width, height);

    const item = isPlaceholder ? (
        <blockquote
            className={classNames([
                styles.placeholderContainer,
                {
                    [styles.centered]: grid !== null,
                },
            ])}
        >
            <div className={styles.placeholderInner}>
                <Placeholders.Text className={styles.placeholder} />
            </div>
        </blockquote>
    ) : (
        <figure
            className={classNames([
                styles.figure,
                {
                    [styles.centered]: grid !== null,
                },
            ])}
        >
            <blockquote className={styles.blockquote}>
                <Text {...quote} className={styles.quote} />
            </blockquote>
            {author || source ? (
                <figcaption className={styles.caption}>
                    {author ? (
                        <>
                            <span>&mdash;</span>
                            <Text {...author} className={styles.author} />
                        </>
                    ) : null}{' '}
                    {source ? (
                        <cite>
                            <Text {...source} className={styles.source} />
                        </cite>
                    ) : null}
                </figcaption>
            ) : null}
        </figure>
    );

    const itemsArray = Array(layout.length || 1);
    const index = Math.min(position - 1, layout.length - 1);
    if (index < itemsArray.length) {
        itemsArray.splice(index, 1, item);
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles.isGrid]: grid !== null,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height}>
                    {grid !== null ? (
                        <Grid {...grid} items={itemsArray} className={styles.grid} />
                    ) : (
                        <Box {...box} items={itemsArray} className={styles.box} />
                    )}
                </Frame>
            </Background>
        </div>
    );
};

QuoteComponent.propTypes = propTypes;
QuoteComponent.defaultProps = defaultProps;

export default QuoteComponent;
