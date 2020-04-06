/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/component-box';
import Grid from '@micromag/component-grid';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import TextComponent from '@micromag/component-text';
import ImageComponent from '@micromag/component-image';
import { useScreenSize } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.text,
    image: MicromagPropTypes.image,
    background: MicromagPropTypes.backgroundComponent,
    box: MicromagPropTypes.boxComponent,
    grid: MicromagPropTypes.gridComponent,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    reverse: PropTypes.bool,
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
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const textElement = isSimple ? (
        <div className={styles.placeholderContainer}>
            <Placeholders.ShortText key="text-element" className={styles.placeholder} />
        </div>
    ) : (
        <TextComponent {...text} key="text-element" className={styles.text} />
    );

    const imageElement = isSimple ? (
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
                    [styles.isPlaceholder]: renderFormat === 'placeholder',
                    [styles.isPreview]: renderFormat === 'preview',
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
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

export default TextImageScreen;
