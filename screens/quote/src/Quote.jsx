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

const Quote = ({
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

    const item = isPlaceholder ? (
        <blockquote className={styles.placeholderContainer}>
            <div className={styles.placeholderInner}>
                <Placeholders.Text className={styles.placeholder} />
            </div>
        </blockquote>
    ) : (
        <figure className={styles.figure}>
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

    const boxComponent =
        box !== null ? <Box {...box} items={itemsArray} className={styles.box} /> : null;

    const items =
        box !== null && grid !== null ? itemsArray.map(i => (i ? boxComponent : null)) : itemsArray;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height}>
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.grid} />
                    ) : (
                        boxComponent
                    )}
                </Frame>
            </Background>
        </div>
    );
};

Quote.propTypes = propTypes;
Quote.defaultProps = defaultProps;

export default Quote;
