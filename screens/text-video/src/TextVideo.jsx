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
    text: MicromagPropTypes.text,
    background: MicromagPropTypes.backgroundComponent,
    box: MicromagPropTypes.box,
    grid: MicromagPropTypes.box,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    isPlaceholder: false,
    isPreview: true,
    className: null,
};

const TextVideoScreen = ({
    text,
    background,
    box,
    grid,
    textAlign,
    isPlaceholder,
    isPreview,
    className,
}) => {
    const { width, height } = useScreenSize();

    const item = isPlaceholder ? (
        <Placeholders.Text height={0.5} lines={4} className={styles.placeholder} />
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
                            [styles.isPlaceholder]: isPlaceholder,
                            [styles.isPreview]: isPreview,
                            [styles[textAlign]]: textAlign !== null,
                            [className]: className !== null,
                        },
                    ])}
                >
                    {grid !== null ? (
                        <Grid {...grid} items={[item]} className={styles.box} />
                    ) : (
                        <Box {...box} items={[item]} className={styles.box} />
                    )}
                </div>
            </Frame>
        </Background>
    );
};

TextVideoScreen.propTypes = propTypes;
TextVideoScreen.defaultProps = defaultProps;

export default TextVideoScreen;
