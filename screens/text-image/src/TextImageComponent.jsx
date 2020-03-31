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
    box: MicromagPropTypes.box,
    grid: MicromagPropTypes.box,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    reverse: PropTypes.bool,
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
    isPlaceholder: false,
    isPreview: true,
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
    isPlaceholder,
    isPreview,
    className,
}) => {
    const { width, height } = useScreenSize();

    const textElement = isPlaceholder ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...text} className={styles.text} />
    );

    const imageElement = isPlaceholder ? (
        <Placeholders.Image className={styles.placeholder} />
    ) : (
        <ImageComponent {...image} className={styles.image} />
    );

    const items = reverse ? [imageElement, textElement] : [textElement, imageElement];

    return (
        <Background {...background} width={width} height={height}>
            <Frame width={width} height={height}>
                <div
                    className={classNames([
                        styles.container,
                        {
                            [styles.isPlaceholder]: isPlaceholder,
                            [styles.isPreview]: isPreview,
                            [styles[textAlign]]: textAlign !== null,
                            [className]: className !== null,
                        },
                    ])}
                >
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.box} />
                    ) : (
                        <Box {...box} items={items} className={styles.box} />
                    )}
                </div>
            </Frame>
        </Background>
    );
};

TextImageScreen.propTypes = propTypes;
TextImageScreen.defaultProps = defaultProps;

export default TextImageScreen;
