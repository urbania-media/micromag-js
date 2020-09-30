/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Stack from '@micromag/element-stack';
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
    visible: PropTypes.bool,
    active: PropTypes.bool,
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
    visible: true,
    active: false,
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
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const { layout = [] } = grid || {};

    const item = (
        <QuoteBlock
            quote={quote}
            source={source}
            author={author}
            isPlaceholder={isPlaceholder}
            showEmpty={isEditor}
            centered={grid !== null}
        />
    );
    const itemsArray = Array(layout.length || 1);
    const index = Math.min(position - 1, layout.length - 1);
    if (index < itemsArray.length) {
        itemsArray.splice(index, 1, item);
    }

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
            [className]: className,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    {grid !== null ? (
                        <Grid
                            {...grid}
                            isSmall={isSimple}
                            items={itemsArray}
                            className={styles.grid}
                        />
                    ) : (
                        <Stack {...box} isSmall={isSimple} className={styles.box}>
                            {item}
                        </Stack>
                    )}
                </Container>
            </div>
        </div>
    );
};

QuoteScreen.propTypes = propTypes;
QuoteScreen.defaultProps = defaultProps;

export default React.memo(QuoteScreen);
