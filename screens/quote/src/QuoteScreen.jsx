/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import Grid from '@micromag/element-grid';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import QuoteBlock from './QuoteBlock';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundElement,
    quote: MicromagPropTypes.textElement,
    source: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    grid: MicromagPropTypes.gridElement,
    box: MicromagPropTypes.boxElement,
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

const QuoteScreen = ({
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
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);
    const { layout = [] } = grid || {};

    const item = (
        <QuoteBlock
            quote={quote}
            source={source}
            author={author}
            isPlaceholder={isPlaceholder}
            centered={grid !== null}
        />
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
                    [styles.disabled]: isSimple,
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

QuoteScreen.propTypes = propTypes;
QuoteScreen.defaultProps = defaultProps;

export default QuoteScreen;
