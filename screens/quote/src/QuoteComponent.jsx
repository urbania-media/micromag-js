/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import TextComponent from '@micromag/component-text';
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
    grid: MicromagPropTypes.gridComponent,
    box: MicromagPropTypes.boxComponent,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    position: PropTypes.number,
    renderFormat: MicromagPropTypes.renderFormat,
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
    renderFormat: 'view',
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
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { layout = [] } = grid || {};
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const item = isSimple ? (
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
                <TextComponent {...quote} className={styles.quote} />
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
                    [styles.isPlaceholder]: renderFormat === 'placeholder',
                    [styles.isPreview]: renderFormat === 'preview',
                    [styles.isGrid]: grid !== null,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height}>
                    {grid !== null ? (
                        <Grid
                            {...grid}
                            withSmallSpacing={isSimple}
                            items={itemsArray}
                            className={styles.grid}
                        />
                    ) : (
                        <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                            {item}
                        </Box>
                    )}
                </Frame>
            </Background>
        </div>
    );
};

QuoteComponent.propTypes = propTypes;
QuoteComponent.defaultProps = defaultProps;

export default QuoteComponent;
