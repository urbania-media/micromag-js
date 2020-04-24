/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/element-box';
import Grid from '@micromag/element-grid';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.textComponent,
    image: MicromagPropTypes.imageComponent,
    background: MicromagPropTypes.backgroundComponent,
    box: MicromagPropTypes.boxComponent,
    grid: MicromagPropTypes.gridComponent,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    reverse: PropTypes.bool,
    visible: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    image: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    reverse: false,
    visible: true,
    renderFormat: 'view',
    className: null,
};

const TextImageScreen = ({
    text,
    image,
    background,
    box,
    grid,
    textAlign,
    reverse,
    visible,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);
    const { direction } = box;
    const textElement = isPlaceholder ? (
        <div className={styles.placeholderContainer}>
            <Placeholders.ShortText key="text-element" className={styles.placeholder} />
        </div>
    ) : (
        <TextComponent {...text} key="text-element" className={styles.text} />
    );

    const imageElement = isPlaceholder ? (
        <Placeholders.SmallImage key="image-element" className={styles.placeholderImage} />
    ) : (
        <ImageComponent {...image} key="image-element" className={styles.image} />
    );

    const items = reverse ? [textElement, imageElement] : [imageElement, textElement];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [styles.sideways]: direction === 'row',
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height} visible={visible}>
                    {grid !== null ? (
                        <Grid {...grid} withSmallSpacing={isSimple} items={items} />
                    ) : (
                        <Box {...box} withSmallSpacing={isSimple}>
                            {items}
                        </Box>
                    )}
                </Frame>
            </Background>
        </div>
    );
};

TextImageScreen.propTypes = propTypes;
TextImageScreen.defaultProps = defaultProps;

export default React.memo(TextImageScreen);
