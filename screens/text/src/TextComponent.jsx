/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/component-box';
import Grid from '@micromag/component-grid';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import TextComponent from '@micromag/component-text';
import { useScreenSize } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.textComponent,
    background: MicromagPropTypes.backgroundComponent,
    box: MicromagPropTypes.boxComponent,
    grid: MicromagPropTypes.gridComponent,
    textAlign: MicromagPropTypes.textAlign,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    renderFormat: 'view',
    className: null,
};

const TextScreen = ({ text, background, box, grid, textAlign, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const item = isSimple ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...text} className={styles.text} />
    );

    return (
        <Background {...background} width={width} height={height}>
            <Frame width={width} height={height}>
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
                    {grid !== null ? (
                        <Grid {...grid} items={[item]} className={styles.box} />
                    ) : (
                        <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                            {item}
                        </Box>
                    )}
                </div>
            </Frame>
        </Background>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default TextScreen;
