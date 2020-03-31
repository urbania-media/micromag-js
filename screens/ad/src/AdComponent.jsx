/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Image from '@micromag/component-image';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    target: MicromagPropTypes.target,
    iframe: PropTypes.string,
    image: MicromagPropTypes.image,
    background: MicromagPropTypes.backgroundComponent,
    isFullScreen: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    url: null,
    target: '_blank',
    iframe: null,
    image: null,
    background: null,
    isFullScreen: true,
    renderFormat: 'view',
    className: null,
};

const Ad = ({
    width,
    height,
    url,
    iframe,
    image,
    target,
    background,
    isFullScreen,
    renderFormat,
    className,
}) => {
    const { width: screenWidth, height: screenHeight } = useScreenSize();
    const isPlaceholder = renderFormat === 'placeholder';
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';
    const innerStyle = {
        width,
        height,
    };
    let inner = null;

    inner =
        iframe !== null ? <iframe className={styles.iframe} src={iframe} title="iframe" /> : null;

    inner = image !== null ? <Image className={styles.content} {...image} alt="Ad" /> : null;

    const content =
        url !== null ? (
            <a href={url} target={target} rel="noopener noreferer">
                {inner}
            </a>
        ) : (
            inner
        );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isFullScreen]: isFullScreen,
                    [styles.isPlaceholder]: isSimple,
                    [styles.isPreview]: renderFormat === 'preview',
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={screenWidth}
                height={screenHeight}
                className={styles.background}
            >
                <Frame className={styles.frame} width={screenWidth} height={screenHeight}>
                    <div className={styles.inner} style={isSimple ? null : innerStyle}>
                        {isSimple ? <Placeholders.Ad className={styles.placeholder} /> : content}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default Ad;
